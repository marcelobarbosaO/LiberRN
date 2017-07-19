import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import Moment from 'react-moment';
import 'moment/locale/pt-br';

class MensagemChat extends Component {
    constructor(props) {
        super(props);
        this.userProfile = JSON.parse(this.props.profile);
    }

    _renderMsg() {
        if (this.props.item.user_send == this.userProfile.server_response.server_id) {
            return (
                <View style={sty.boxMe}>
                    <View style={sty.topBox}>
                        <Text style={[sty.corWhite, sty.sizeM]}>Você</Text>
                        <Text style={[sty.corWhite, sty.sizeM]}>
                            <Moment locale="pt-br" fromNow element={Text} >{this.props.item.criado.date}</Moment>
                        </Text>
                    </View>
                    <View style={sty.bottomBox}>
                        <Text style={[sty.corWhite, sty.texto]}>{this.props.item.texto}</Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position:'relative' }}>
                        <View style={{ width: 30, height: 30, borderRadius: 40, padding: 0, margin: 0, overflow: 'hidden', borderWidth: 2, borderColor: "rgba(0,0,0,0.1)", position: 'relative', zIndex:102 }}>
                            <Image source={{ uri: this.props.item.img_send, width: 30, height: 30 }} style={{ margin: -2, borderWidth: (Platform.OS == 'ios') ? 0 : 2, borderRadius: (Platform.OS == 'ios') ? 0 : 40, borderColor: "rgba(0,0,0,0.1)" }} />
                        </View>
                    </View>
                    <View style={sty.boxOther}>
                        <View style={sty.topBox}>
                            <Text style={[sty.corBlack, sty.sizeM]}>{this.props.item.nome_send}</Text>
                            <Text style={[sty.corBlack, sty.sizeM]}>
                                <Moment locale="pt-br" fromNow element={Text} >{this.props.item.criado.date}</Moment>
                            </Text>
                        </View>
                        <View style={sty.bottomBox}>
                            <Text style={[sty.corBlack, sty.texto]}>{this.props.item.texto}</Text>
                        </View>
                        { this._loadCircle() }
                    </View>
                </View>
            )
        }
    }

    _loadCircle() {
        if (Platform.OS === 'ios') {
            return (
                <View style={{position: 'absolute', bottom: 0,left: -35,}}>
                    <View style={sty.triangle}></View>
                    <View style={sty.bgTri}></View>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={sty.boxMSG}>
                {this._renderMsg()}
            </View>
        )
    }
}

const sty = StyleSheet.create({
    boxMSG: { flex: 1, paddingHorizontal: 15, marginBottom: 15 },
    boxMe: { padding: 10, borderRadius: 5, flex: 1, position: 'relative', backgroundColor: '#424b54', elevation: 4, shadowColor: '#000', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.5, shadowRadius: 2 },
    boxOther: { padding: 10, paddingLeft: 15, borderRadius: 5, flex: 4, position: 'relative', backgroundColor: '#fff', elevation: 4, shadowColor: '#000', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.5, shadowRadius: 2, overflow: 'visible' },
    topBox: { flexDirection: 'row', justifyContent: 'space-between' },
    corWhite: { color: '#FFF' },
    corBlack: { color: '#424b54' },
    sizeM: { fontSize: 11 },
    texto: { fontSize: 12, paddingTop: 10 },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',

        borderTopWidth: 20,
        borderRightWidth: 40,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderTopColor: 'transparent',
        borderRightColor: '#FFF',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        elevation: 4, shadowColor: '#000', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.5, shadowRadius: 2,
        zIndex: 100
    },
    bgTri: { width: 6, height: 20, backgroundColor: '#fff', position: 'absolute', bottom: 0, left: 40, zIndex: 100 }
})

export default MensagemChat;