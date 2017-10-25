import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Platform, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions, ActionConst } from 'react-native-router-flux';

export default class BoxAnuncio extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight onPress={ () => Actions.AnuncioScreen({ item: this.props.item }) } underlayColor="transparent">
                <View style={sty.box}>
                    <View style={{ flex: .1 }}></View>
                    <View style={sty.boxBg}>
                        <View style={{ flex: (Platform.OS === 'ios') ? .4 : .3 }}>
                            <View style={{ width: 30, height: 30, borderRadius: 40, margin: 0, padding: 0, overflow: 'hidden', borderWidth: 2, borderColor: "rgba(0,0,0,0.1)", position: 'relative', zIndex: 2 }} >
                                <Image source={{ uri: this.props.item.user_foto, width: 30, height: 30 }} style={{ margin: -2, position: 'relative', zIndex: 1, borderWidth: (Platform.OS == 'ios') ? 0 : 2, borderRadius: (Platform.OS == 'ios') ? 0 : 40, borderColor: "rgba(0,0,0,0.1)" }} />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexGrow: 1, width:0 }}>
                            <Text style={sty.Titulo}>{this.props.item.titulo}</Text>
                            <Text style={sty.nomeUser}>{this.props.item.usuario}</Text>
                            <Text style={sty.textDesc}>{this.props.item.descricao}</Text>
                            <Text style={sty.textData}>{this.props.item.data}</Text>
                            <Text style={sty.textPrice}>R$ {this.props.item.preco}</Text>
                            {/*<Image source={require('../../imgs/icones/icon_heart_outline.png')} style={{ width: 20, height: 20, position: 'absolute', bottom: 0, right: 10 }} />*/}
                        </View>
                    </View>
                    <View style={{ position: 'absolute', left: 0, elevation: 6, backgroundColor: '#FFF', top: 60, padding: 0, borderRadius: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.5, shadowRadius: 2 }}>
                        <Image source={{ uri: this.props.item.foto, width: 90, height: 130 }} style={sty.IMGLIVRO} />
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const font = '';
if (Platform.OS == 'ios')
    font = 'OpenSans';
else
    font = 'OpenSans-Regular';

const sty = StyleSheet.create({
    box: { flex: 1, flexDirection: "row", height: 200, marginTop: 7, marginHorizontal: 15, marginBottom: 10 },
    boxBg: { flex: 1, position: 'relative', backgroundColor: "#FFF", padding: 10, flexDirection: "row", borderRadius: 6, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.5, shadowRadius: 2 },
    IMGLIVRO: { resizeMode: "stretch", borderRadius: 6 },
    Titulo: {
        fontSize: (Platform.OS === 'ios') ? 13 : 16,
        color: "#2B3845",
        fontFamily: font
    },
    nomeUser: { fontSize: (Platform.OS === 'ios') ? 10 : 13, marginBottom: 15, fontFamily: font },
    textDesc: { color: "#000", fontSize: (Platform.OS === 'ios') ? 10 : 13, fontFamily: font },
    textData: { position: 'absolute', bottom: 0, left: 0, fontSize: (Platform.OS === 'ios') ? 10 : 13, fontFamily: font },
    textPrice: { position: 'absolute', bottom: 0, right: 0, fontSize: (Platform.OS === 'ios') ? 10 : 13, fontFamily: font }
})