import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default class BoxAnuncio extends Component {
    constructor(props) {
        super(props);
    }

    _loadImageUser(){
        if(this.props.item.user_foto == ''){
            return(
                <Image source={ require('../../imgs/user_default.png') } style={{ width:30, height:30, borderRadius: 40, borderWidth: 2, borderColor: "rgba(0,0,0,0.1)" }} />
            );
        } else {
            return(
                <Image source={{ uri: this.props.item.user_foto, width: 30, height: 30 }} style={{ borderRadius: 40, borderWidth: 2, borderColor: "rgba(0,0,0,0.1)" }} />
            );
        }
    }

    render() {
        return (
            <View style={sty.box}>
                <View style={{ flex: .1 }}></View>
                <View style={sty.boxBg}>
                    <View style={{ flex: .3 }}>
                        { this._loadImageUser() }
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={ sty.Titulo}>{this.props.item.titulo}</Text>
                        <Text style={ sty.nomeUser}>{this.props.item.usuario}</Text>
                        <Text style={ sty.textDesc }>{ this.props.item.descricao }</Text>
                        <Text style={ sty.textData }>{ this.props.item.data }</Text>
                        <Image source={ require('../../imgs/icones/icon_heart_outline.png') } style={{ width:20, height:20, position: 'absolute', bottom:0, right:10}} />
                    </View>
                </View>
                <View style={{ position: 'absolute', left:0, elevation: 6, top:60}}>
                    <Image source={{ uri: this.props.item.foto, width: 90, height: 130 }} style={sty.IMGLIVRO} />
                </View>
            </View>
        );
    }
}

const sty = StyleSheet.create({
    box: { flex: 1, flexDirection: "row", height: 200, marginTop:15, marginHorizontal: 15, marginBottom:10 },
    boxBg: { flex: 1, position: 'relative', backgroundColor: "#FFF", padding: 10, flexDirection: "row", borderRadius: 6, elevation: 4 },
    IMGLIVRO: { resizeMode: "stretch", borderRadius: 5 },
    Titulo: { fontSize: 16, color:"#2B3845" },
    nomeUser: { fontSize: 13, marginBottom:15 },
    textDesc:{ color: "#000", fontSize:13},
    textData:{ position: 'absolute', bottom:0, left:0, fontSize:13},
    textPrice:{ position: 'absolute', bottom:0, right:0, fontSize:13}
})