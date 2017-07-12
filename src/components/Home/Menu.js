import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';

const userProfile = [];

class Menu extends Component {
    constructor(props){
        super(props);
        this.userProfile = this.props.profile;
    }

    render() {
        return (
            <Image source={require('../../imgs/bg_rodape.jpg')} style={{ flex: 1, width: null, height: null, resizeMode: 'stretch' }} >
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ position: 'relative' }} >

                        <Image source={require('../../imgs/bg.png')} style={sty.img} />
                        <View style={sty.perfil}>
                            <Image source={{ uri: this.userProfile.foto, width: 170, height: 170}} style={ sty.imgUser }/>
                            <Text style={ sty.name }>{ this.userProfile.nome }</Text>
                        </View>

                        <View style={{ paddingHorizontal: 40, paddingBottom: 40 }}>

                            <TouchableHighlight onPress={() => false} style={sty.btn} underlayColor="transparent">
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: "center" }}>
                                    <Image source={require('../../imgs/icones/home.png')} style={sty.imgIcon} />
                                    <Text style={sty.itemText}>Início</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight onPress={() => Actions.PerfilScreen({type: ActionConst.RESET}) } style={sty.btn} underlayColor="transparent">
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: "center" }}>
                                    <Image source={require('../../imgs/icones/perfil.png')} style={sty.imgIcon} />
                                    <Text style={sty.itemText}>Perfil</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight onPress={() => false} style={sty.btn} underlayColor="transparent">
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: "center" }}>
                                    <Image source={require('../../imgs/icones/anunciar.png')} style={sty.imgIcon} />
                                    <Text style={sty.itemText}>Anunciar</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight onPress={() => false} style={sty.btn} underlayColor="transparent">
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: "center" }}>
                                    <Image source={require('../../imgs/icones/meus_anuncios.png')} style={sty.imgIcon} />
                                    <Text style={sty.itemText}>Meus Anúncios</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight onPress={() => false} style={sty.btn} underlayColor="transparent">
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: "center" }}>
                                    <Image source={require('../../imgs/icones/lista_desejo.png')} style={sty.imgIcon} />
                                    <Text style={sty.itemText}>Lista de Desejo</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight onPress={() => false} style={sty.btn} underlayColor="transparent">
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: "center" }} >
                                    <Image source={require('../../imgs/icones/mensagens.png')} style={sty.imgIcon} />
                                    <Text style={sty.itemText}>Mensagens</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight onPress={() => false} style={sty.btn} underlayColor="transparent">
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: "center" }}>
                                    <Image source={require('../../imgs/icones/sair.png')} style={sty.imgIcon} />
                                    <Text style={sty.itemText}>Sair</Text>
                                </View>
                            </TouchableHighlight>

                        </View>
                    </ScrollView>
                </View>
            </Image>
        )
    }
}
const sty = StyleSheet.create({
    perfil: {
        flex: 1,
        position: 'absolute',
        height: 265,
        right: 0,
        top: 0,
        left: 0,
        justifyContent:"center",
        alignItems:"center"
    },
    imgUser:{ borderRadius: 100, borderWidth: 10, borderColor:"rgba(0,0,0,0.5)"},
    name:{ fontSize: 22, color:"#fff", fontWeight:"bold"},
    img: {
        flex: 1,
        width: null,
        height: 350,
        resizeMode: 'contain'
    },
    btn: { marginBottom: 10 },
    imgIcon: { height: 35, width: 35, resizeMode: "center", marginRight: 20 },
    itemText: {
        fontSize: 18
    }
})

const mapStateToProps = state => ({
    profile: state.AppReducer.profile
});
export default connect(mapStateToProps, {})(Menu);