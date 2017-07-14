import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, AsyncStorage } from 'react-native';
import Drawer from 'react-native-drawer';
import { TabViewAnimated, SceneMap } from 'react-native-tab-view';
import { connect } from 'react-redux';

import TabBarHome from './Home/TabBarHome';
import Vender from './Home/Vender';
import Doar from './Home/Doar';
import Trocar from './Home/Trocar';
import Parceiros from './Home/Parceiros';

import Menu from './Home/Menu';
import { logarFace } from '../actions/AppActions';

class HomeScreen extends Component {
    constructor(props){
        super(props);
    }

    state = {
        index: 0,
        routes: [
            { key: '1', title: 'Vender' },
            { key: '2', title: 'Trocar' },
            { key: '3', title: 'Doar' },
            { key: '4', title: 'Parceiros' },
        ],
    };

    _handleChangeTab = index => this.setState({ index });
    _renderHeader = props => <TabBarHome {...props} />;
    _renderScene = SceneMap({
        '1': Vender,
        '2': Trocar,
        '3': Doar,
        '4': Parceiros,
    });

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
                tweenHandler={ (ratio) => ({
                    mainOverlay: { opacity:((ratio * 8)/10) }
                })}
            >
                <TabViewAnimated
                    style={styles.container}
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderHeader={this._renderHeader}
                    onRequestChangeTab={this._handleChangeTab}
                />
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
    }
});

//export default HomeScreen
const mapStateToProps = state => ({
    profile: state.AppReducer.profile
});

export default connect(mapStateToProps, { logarFace })(HomeScreen);