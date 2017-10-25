import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Platform, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions, ActionConst } from 'react-native-router-flux';

export default class BoxMensagem extends Component {
    constructor(props) {
        super(props);

        this.livro = {chat_status: this.props.item.chat_status, usuario: this.props.item.user_nome, user_id: this.props.item.user_id, id: this.props.item.id_livro };
    }

    render() {
        return (
            <View style={sty.box}>
                <TouchableHighlight onPress={() => Actions.ChatScreen({ item: this.livro }) } style={sty.boxBg} underlayColor="transparent">
                    <View style={sty.boxBg}>
                        <View style={{ flex: 1 }}>
                            <View style={{ position: 'absolute', borderRadius: 6, top: 0, left: 0, width: 72, height: 107, elevation: 6, padding: 0, margin: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.5, shadowRadius: 2, position: 'relative' }}>
                                <Image source={{ uri: this.props.item.foto, width: 72, height: 107 }} style={sty.IMGLIVRO} />
                            </View>
                        </View>
                        <View style={{ flex: .3 }}></View>
                        <View style={{ flex: 3, flexGrow:3, width:0, position: 'relative' }}>
                            <Text style={sty.titulo}>{this.props.item.titulo}</Text>
                            <Text style={sty.data}>{this.props.item.data}</Text>
                            <TouchableHighlight onPress={() => this.props.deleteMensagem(this.props.item.id)} underlayColor="transparent" style={{ position: 'absolute', top: 0, right: 0 }}>
                                <Image source={require('../../imgs/icones/delete.png')} style={{ width: 25, height: 25 }} />
                            </TouchableHighlight>
                            <Text style={sty.lastMsg}>"{this.props.item.mensagem}"</Text>
                            <View style={sty.boxUser}>
                                <View style={{ width: 30, height: 30, borderRadius: 40, padding: 0, margin: 0, overflow: 'hidden', borderWidth: 2, borderColor: "rgba(0,0,0,0.1)", position: 'relative' }}>
                                    <Image source={{ uri: this.props.item.user_foto, width: 30, height: 30 }} style={{ margin: -2, borderWidth: (Platform.OS == 'ios') ? 0 : 2, borderRadius: (Platform.OS == 'ios') ? 0 : 40, borderColor: "rgba(0,0,0,0.1)" }} />
                                </View>
                                <Text style={sty.nome_user}>{this.props.item.user_nome}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const font = '';
if (Platform.OS == 'ios')
    font = 'OpenSans';
else
    font = 'OpenSans-Regular';

const sty = StyleSheet.create({
    box: { flex: 1, backgroundColor: '#FFF', flexDirection: "row", height: 127, marginTop: 7, marginHorizontal: 15, marginBottom: 10, padding: 10, borderRadius: 4, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.5, shadowRadius: 2 },
    boxBg: { flex: 1, flexDirection: 'row' },
    //boxBg: { flex: 1, position: 'relative', backgroundColor: "#FFF", padding: 10, flexDirection: "row", borderRadius: 6, elevation: 4, shadowColor: '#000',shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.5,shadowRadius: 2 },
    IMGLIVRO: { resizeMode: "stretch", borderRadius: 6 },
    titulo: { fontFamily: font, fontSize: (Platform.OS == 'ios') ? 14 : 16, color: "#424b54", paddingBottom: 10 },
    data: { fontFamily: font, fontSize: (Platform.OS == 'ios') ? 11 : 13, color: "#93a8ac", marginBottom: 10, fontWeight: 'bold' },
    lastMsg: { color: "#93a8ac", fontSize: (Platform.OS == 'ios') ? 10 : 12, position: 'absolute', bottom: 0, left: 0 },
    boxUser: { position: 'absolute', bottom: 0, right: 0, alignItems: 'flex-end' },
    nome_user: { color: "#424b54", fontSize: (Platform.OS == 'ios') ? 10 : 12, fontWeight: 'bold' }
})