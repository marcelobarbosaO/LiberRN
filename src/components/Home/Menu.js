import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableHighlight, Platform,AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';


class Menu extends Component {
    constructor(props){
        super(props);

        this.state = { loadProfile: false, userProfile: []};
    }

    componentWillMount(){
        if(this.props.profile.length > 0 && this.props.profile != []){
            if(this.state.loadProfile == false){
                this.setState({loadProfile: true, userProfile: JSON.parse(this.props.profile) });
            }
        } else {
            this.checkUser();
        }
    }

    checkUser(){
         if(this.props.profile.length > 0 && this.props.profile != [] && this.props.profile != 'string'){
                this.setState({loadProfile: true, userProfile: JSON.parse(this.props.profile) });
        } else {
            let self = this;
            setTimeout(function(){
                self.checkUser();
            },300);
        }
    }

    _loadContent(){
        if(this.state.loadProfile){
            return(
            <View style={sty.perfil}>
                <View style={ sty.boxImg }>
                    <Image source={{ uri: this.state.userProfile.foto, width: 170, height: 170}} style={ sty.imgUser }/>
                </View>
                <Text style={ sty.name }>{ this.state.userProfile.nome }</Text>
            </View>
            )
        } else {
            return(
                <View style={sty.perfil}>
                    <View style={ sty.boxImg }>
                        <Image source={{ uri: 'https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png', width: 170, height: 170}} style={ sty.imgUser }/>
                    </View>
                    <Text style={ sty.name }>{ "SEM NOME" }</Text>
                </View>
            )
        }
    }

    _logOff(){
        AsyncStorage.removeItem('profile', (err) => {
            Actions.LoginScreen({ type: ActionConst.RESET});
        })
    }

    render() {
        return (
            <Image source={require('../../imgs/bg_rodape.jpg')} style={{ flex: 1, width: null, height: null, resizeMode: 'stretch' }} >
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ position: 'relative'}} >
                        <Image source={require('../../imgs/bg.png')} style={sty.img} />
                        { this._loadContent() }

                        <View style={{ paddingHorizontal: 40, paddingBottom: 40 }}>

                            <TouchableHighlight onPress={() => Actions.HomeScreen({type: ActionConst.RESET})} style={sty.btn} underlayColor="transparent">
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

                            <TouchableHighlight onPress={() => this._logOff() } style={sty.btn} underlayColor="transparent">
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
    boxImg:{ borderRadius: 100, borderWidth: 7, borderColor:"rgba(0,0,0,0.5)", overflow:'hidden', padding: 0, margin:0},
    imgUser:{ margin: -7, borderRadius: (Platform.OS == 'ios') ? 0:100, borderWidth: (Platform.OS == 'ios') ? 0:7, borderColor:"rgba(0,0,0,0.5)"},
    name:{ fontSize: 22, color:"#fff", fontWeight:"bold", backgroundColor:'transparent'},
    img: {
        flex: 1,
        width: null,
        height: (Platform.OS == 'ios') ? 307:350,
        position:'relative',
        top:0,
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