import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Platform, Button, TouchableHighlight, AsyncStorage, Alert } from 'react-native';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';
import axios from 'axios';

import { logarFace } from '../actions/AppActions';

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        var _this = this;

        /*
        AsyncStorage.getItem('profile', (err, result) => {
            if (result != null) {
                _this.props.logarFace(JSON.stringify(result));
                Actions.HomeScreen({ type: ActionConst.RESET });
            }
        });*/
    }

    _loginFacebook() {
        let self = this;
        FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native); // defaults to Native
        FBLoginManager.loginWithPermissions(["email", "user_friends", "public_profile"], function (error, data) {
            if (!error) {
                //alert(JSON.stringify(data.credentials));
                self._loadImage(data.credentials);
            } else {
                console.log("Error: ", error);
            }
        })
    }

    _validaLogin(perfil) {
        var _this = this;
        axios.post('http://liberapp.com.br/api/validaUser', { email: perfil.email, id: perfil.userId, one_signal_id: '' })
            .then(function (response) {
                //alert(JSON.stringify(response.data));
                if (response.data.status == true) {
                    //esta cadastrado, entao joga pra index
                    let newData = { "server_foto": response.data.url_foto, "server_id": response.data.user_id, "user_pro": response.data.user_pro, "logado": response.data.logado };
                    _this._initDataToStorage(newData, perfil, false);
                } else {
                    //cadastra o usuario no sistema
                    _this._cadastraUser(perfil);
                }
            })
            .catch(function (error) {
                alert(error);
                Alert.alert("Houve um erro ao validar seu login! Tente mais tarde");
            });
    }

    _initDataToStorage(newData, perfil, novo_usuario) {
        let perf = { "nome": perfil.nome, "email": perfil.email, "foto": perfil.foto, "userId": perfil.userId, "token": perfil.token, "server_response": newData };
        AsyncStorage.setItem("profile", JSON.stringify(perf));
        this.props.logarFace(perf);
        if(novo_usuario)
            Actions.SlidesScreen({ type: ActionConst.RESET });//jogar pro slide de apresentacao
        else
            Actions.HomeScreen({ type: ActionConst.RESET });
    }

    _cadastraUser(perfil) {
        let dados = { nome: perfil.nome, email: perfil.email, id: perfil.userId, foto: perfil.foto, niver: '', id_onesignal: '' }
        axios.post('http://liberapp.com.br/api/cadUser', dados)
            .then(function (response) {
                if (response.data.status == 0 || response.data.status == "0") {
                    let newData = { "server_foto": response.data.url_foto, "server_id": response.data.user_id, "user_pro": false, "logado": true };
                    _this._initDataToStorage(newData, perfil, true);
                } else {
                    Alert.alert("Houve um erro ao lhe cadastrar no sistema. Tente mais tarde");
                }
            })
            .catch(function (error) {
                Alert.alert("Houve um erro ao lhe cadastrar no sistema. Tente mais tarde");
            });
    }

    _loadImage(credentials) {
        var _this = this;
        var url = 'https://graph.facebook.com/v2.3/' + credentials.userId + '/picture?width=300&redirect=false&access_token=' + credentials.token;
        var user = 'https://graph.facebook.com/v2.3/' + credentials.userId + '?fields=id,name,email,location,birthday&redirect=false&access_token=' + credentials.token;
        
        fetch(url).then((resp) => resp.json())
        .then((respData) => {
            fetch(user).then((response) => response.json())
            .then((responseData) => {
                let perfil = { "nome": responseData.name, "email": responseData.email, "foto": respData.data.url, "userId": credentials.userId, "token": credentials.token };
                _this._validaLogin(perfil);//loga o usuario com o do BD ou cadastra
            }).done();
        }).done();

    }

    render() {
        return (
            <Image source={require('../imgs/bg_3.jpg')} style={sty.bgImg}>
                <View style={sty.boxGeral}>

                    <Image source={require('../imgs/logo_liber.png')} style={sty.logo} />

                    <Text style={{backgroundColor:'transparent', marginBottom: 200, color:'#2B3845', fontSize: 16, textAlign:'center'}}>Leia, liberte-se</Text>

                    <TouchableHighlight style={sty.btn} onPress={() => this._loginFacebook()} underlayColor="#3B5998">
                        <Text style={sty.text}>Entrar com Facebook</Text>
                    </TouchableHighlight>

                </View>
            </Image>
        );
    };
}

const marg = '';
if(Platform.OS === 'ios'){
    marg = 30;
} else {
    marg = 0;
}

const sty = StyleSheet.create({
    boxGeral: {
        flex: 1,
        padding: 30,
        justifyContent: 'center'
    },
    bgImg: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'stretch'
    },
    logo: {
        width: null,
        height: 100,
        marginHorizontal: marg,
        resizeMode: "center"
    },
    btn: {
        backgroundColor: "#3B5998",
        paddingVertical: 15,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: "#fff",
        fontSize: 18
    }
});

const mapStateToProps = state => ({
    credentials: state.AppReducer.credentials,
    profile: state.AppReducer.profile
});

export default connect(mapStateToProps, { logarFace })(LoginScreen);