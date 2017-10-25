import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TabViewAnimated, SceneMap } from 'react-native-tab-view';
import { Actions, ActionConst } from 'react-native-router-flux';

import TabBarHome from './Busca/TabBarHome';
import Vender from './Busca/Vender';
import Doar from './Busca/Doar';
import Trocar from './Busca/Trocar';

class BuscaScreen extends Component {
    constructor(props) {
        super(props);

     //   alert(JSON.stringify(this.props));
    }

    state = {
        index: 0,
        routes: [
            { key: '1', title: 'Vender', palavra: this.props.palavra },
            { key: '2', title: 'Trocar', palavra: this.props.palavra },
            { key: '3', title: 'Doar', palavra: this.props.palavra }
        ]
    };

    _handleChangeTab = index => this.setState({ index });
    _renderHeader = props => <TabBarHome {...props} />;
    _renderScene = SceneMap({
        '1': Vender,
        '2': Trocar,
        '3': Doar
    });

    render() {
        return (
            <TabViewAnimated
                style={styles.container}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onRequestChangeTab={this._handleChangeTab}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default BuscaScreen;