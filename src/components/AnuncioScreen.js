import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Image, TouchableHighlight } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

class AnuncioScreen extends Component {
    constructor(props) {
        super(props);


    }

    _backHistory() {
        Actions.pop();
    }

    _loadImageUser() {
        if (this.props.item.user_foto == '') {
            return (
                <View style={{ width: 30, height: 30, borderRadius: 40, padding: 0, margin: 0, overflow: 'hidden', borderWidth: 3, borderColor: "rgba(0,0,0,0.1)" }}>
                    <Image source={require('../imgs/user_default.png')} style={{ margin: -3, width: 30, height: 30, borderWidth: (Platform.OS == 'ios') ? 0 : 2, borderRadius: (Platform.OS == 'ios') ? 0 : 40, borderColor: "rgba(0,0,0,0.1)" }} />
                </View>
            );
        } else {
            return (
                <View style={{ width: 30, height: 30, borderRadius: 40, padding: 0, margin: 0, overflow: 'hidden', borderWidth: 3, borderColor: "rgba(0,0,0,0.1)", position: 'relative' }}>
                    <Image source={{ uri: this.props.item.user_foto, width: 30, height: 30 }} style={{ margin: -3, borderWidth: (Platform.OS == 'ios') ? 0 : 2, borderRadius: (Platform.OS == 'ios') ? 0 : 40, borderColor: "rgba(0,0,0,0.1)" }} />
                </View>
            );
        }
    }

    render() {
        return (
            <View style={est.boxGeral}>
                <View style={est.ToolBar}>
                    <View style={{ flex: .3 }}>
                        <TouchableHighlight onPress={() => { this._backHistory() }} underlayColor="#FFF">
                            <Icon name="md-arrow-round-back" size={20} color="#2B3845" />
                        </TouchableHighlight>
                    </View>
                    <View style={{ flex: 1, alignItems: "center", overflow: 'hidden' }}>

                    </View>
                    <View style={{ flex: .3, alignItems: "flex-end" }}>
                    </View>
                </View>
                <View style={est.content}>

                    <View style={est.boxTopo}>
                        <Image source={require('../imgs/bg_anuncio.jpg')} style={{ flex: 1, resizeMode: 'stretch', width: null }}>
                            <View style={{ flex: 1, padding: 20, flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={{ uri: this.props.item.foto, width: 90, height: 130, }} />
                                <View style={{ paddingLeft: 15 }}>
                                    <Text style={[est.trans, { color: '#FFF', fontSize: 16, marginBottom: 15, fontWeight: 'bold' }]}>{this.props.item.titulo}</Text>
                                    <Text style={[est.trans, { color: '#FFF', fontSize: 13, paddingBottom: 30 }]}>Postado: {this.props.item.data}</Text>
                                </View>
                            </View>
                            <View style={{ position: 'absolute', bottom: 5, right: 5, alignItems:'flex-end' }}>
                                { this._loadImageUser() }
                                <Text style={[est.trans, { fontSize:15, color:'#fff' }]}>{this.props.item.usuario}</Text>
                            </View>
                        </Image>
                    </View>
                    <View style={est.boxMeio}>

                    </View>
                    <View style={est.boxBottom}>

                    </View>
                </View>
            </View>
        );
    }
}
const font = '';
if (Platform.OS == 'ios')
    font = 'OpenSans';
else
    font = 'OpenSans-Regular';

const est = StyleSheet.create({
    boxGeral: {
        flex: 1,
    },
    ToolBar: { paddingTop: (Platform.OS === 'ios') ? 20 : 0, height: 50, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, backgroundColor: "#FFF" },
    content: { backgroundColor: '#eee', flex: 1 },
    imgUser: { margin: -7, borderRadius: (Platform.OS == 'ios') ? 0 : 100, borderWidth: (Platform.OS == 'ios') ? 0 : 7, borderColor: "rgba(0,0,0,0.5)" },
    boxTopo: { flex: .8, backgroundColor: '#f00' },
    trans: { backgroundColor: 'transparent', fontFamily: font },
    boxMeio: { flex: .2, backgroundColor: '#f90' },
    boxBottom: { flex: 1, backgroundColor: '#000' }
});

export default AnuncioScreen;