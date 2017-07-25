import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, StatusBar, Platform } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

export default class TabBarHome extends Component {
    constructor(props){
        super(props);
    }

    static contextTypes = { drawer: React.PropTypes.object }

    _openMenu() {
        this.context.drawer.open();
    }
    
    _closeMenu() {
        this.context.drawer.close();
    }

    render() {
        return (
            <View style={estilo.boxGeral}>
                <StatusBar backgroundColor="#000" />

                <View style={{ flexDirection: 'row', backgroundColor:'#FFF', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                    <TouchableHighlight onPress={() => { this._openMenu() }} underlayColor="#FFF" style={{ flex: 1, alignItems: 'flex-start', justifyContent: "center" }}>
                        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: "center" }}>
                            <Icon name="md-menu" size={20} color="#2B3845" />
                        </View>
                    </TouchableHighlight>

                    <View style={estilo.viewTopo}>
                        <Image source={require('../../imgs/logo_liber.png')} style={estilo.logo} />
                    </View>


                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: "center" }}>
                        <TouchableHighlight onPress={() => { false }} underlayColor="#FFF">
                            <Icon name="md-search" size={20} color="#2B3845" />
                        </TouchableHighlight>
                    </View>
                </View>

                <TabBar {...this.props} style={{ elevation: 0, backgroundColor: '#FFF' }} pressColor="#2B3845" indicatorStyle={{ backgroundColor: "#2B3845" }} labelStyle={{ color: "#2B3845", fontSize: (Platform.OS=== 'ios') ? 8:10 }} />
            </View>
        )
    }
}

const estilo = StyleSheet.create({
    boxGeral: {
        elevation: 4,
        paddingTop: (Platform.OS === 'ios') ? 20:0
    },
    viewTopo: { flex: 2, paddingVertical: (Platform.OS === 'ios') ? 0:10, justifyContent: "center" },
    logo: { width: null, height: 50, resizeMode: 'center' },
    white_text: { color: "#FFF" },
    fonte20: {
        fontSize: 20,
    },
    txtApp: {
        marginLeft: 20
    }
});