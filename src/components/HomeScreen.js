import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, AsyncStorage, Dimensions, Keyboard, TextInput, Platform } from 'react-native';
import Drawer from 'react-native-drawer';
import { TabViewAnimated, SceneMap } from 'react-native-tab-view';
import { connect } from 'react-redux';
import SearchBar from 'react-native-searchbar';
import { Actions, ActionConst } from 'react-native-router-flux';
import OneSignal from 'react-native-onesignal';

import TabBarHome from './Home/TabBarHome';
import Vender from './Home/Vender';
import Doar from './Home/Doar';
import Trocar from './Home/Trocar';
import Parceiros from './Home/Parceiros';

import Menu from './Outros/Menu';
import { logarFace } from '../actions/AppActions';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
    }

    componentWillMount(){
        OneSignal.addEventListener('received', this.onReceived);
    }

    onReceived(notification) {
        //console.log("Notification received: ", notification);
        if(Platform.OS == 'android'){
            alert(JSON.stringify(notification));
        }
    }

    state = {
        index: 0,
        routes: [
            { key: '1', title: 'Vender' },
            { key: '2', title: 'Trocar' },
            { key: '3', title: 'Doar' },
            { key: '4', title: 'Parceiros' },
        ],
        openSearch: false,
        palavra: ''
    };

    _handleChangeTab = index => this.setState({ index });
    _renderHeader = props => <TabBarHome {...props} btnSearch={this.search} />;
    _renderScene = SceneMap({
        '1': Vender,
        '2': Trocar,
        '3': Doar,
        '4': Parceiros,
    });

    search() {
        this.setState({ openSearch: true});
        this.searchBar.show();
    }

    _showBusca() {
        if (this.state.openSearch) {
            return (
                <View style={styles.boxSearch}></View>
            )
        }
    }

    hideSearch(){
        this.setState({ openSearch: false});
        this.searchBar.hide();
    }

    _initSearch(){
        if(this.state.palavra != ''){
            this.hideSearch();
            Actions.BuscaScreen({palavra: this.state.palavra});
        }
    }

    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                content={<Menu />}
                openDrawerOffset={50}
                tweenDuration={100}
                type="overlay"
                panCloseMask={0.2}
                tapToClose={true}
                styles={DrawerStyle}
                tweenHandler={(ratio) => ({
                    mainOverlay: { opacity: ((ratio * 8) / 10) }
                })}
            >
                <TabViewAnimated
                    style={styles.container}
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderHeader={this._renderHeader}
                    onRequestChangeTab={this._handleChangeTab}
                />
                <SearchBar
                    ref={(ref) => this.searchBar = ref}
                    data={[]}
                    placeholder="Digite o que procura"
                    onSubmitEditing={ () => this._initSearch() }
                    fontSize={ 16 }
                    onBack={ () => this.hideSearch() }
                    handleChangeText={ (texto) => this.setState({ palavra: texto} )}
                    showOnLoad={false}
                />
                { this._showBusca() }
            </Drawer>
        );
    }
}

const DrawerStyle = {
    mainOverlay: { backgroundColor: "rgba(0,0,0,1)", opacity: 0 }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    boxSearch: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)'
    }
});

//export default HomeScreen
const mapStateToProps = state => ({
    profile: state.AppReducer.profile
});

export default connect(mapStateToProps, { logarFace })(HomeScreen);