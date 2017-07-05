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
        AsyncStorage.getItem('profile', (err, result) => {
            if (result != null) {
                _this.props.logarFace(JSON.stringify(result));
                Actions.HomeScreen({ type: ActionConst.RESET });
            }
        });
    }

    _loginFacebook() {
        let self = this;
        FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native); // defaults to Native
        FBLoginManager.loginWithPermissions(["email", "user_friends", "public_profile"], function (error, data) {
            if (!error) {
                self._loadImage(data.profile, data.credentials);
            } else {
                console.log("Error: ", error);
            }
        })
    }

    _validaLogin(perfil) {
        var _this = this;
        axios.post('http://liberapp.com.br/api/validaUser', { email: perfil.email, id: perfil.userId, one_signal_id: '' })
            .then(function (response) {
                if (response.data.status == true) {
                    //esta cadastrado, entao joga pra index
                    let newData = { "server_foto": response.data.url_foto, "server_id": response.data.user_id, "user_pro": response.data.user_pro, "logado": response.data.logado };
                    _this._initDataToStorage(newData, perfil);
                } else {
                    //cadastra o usuario no sistema
                    _this._cadastraUser(perfil);
                }
            })
            .catch(function (error) {
                Alert.alert("Houve um erro ao validar seu login! Tente mais tarde");
            });
    }

    _initDataToStorage(newData, perfil) {
        let perf = { "nome": perfil.nome, "email": perfil.email, "foto": perfil.foto, "userId": perfil.userId, "token": perfil.token, "server_response": newData };
        AsyncStorage.setItem("profile", JSON.stringify(perf));
        this.props.logarFace(perf);
        Actions.HomeScreen({ type: ActionConst.RESET });
    }

    _cadastraUser(perfil) {
        let dados = { nome: perfil.nome, email: perfil.email, id: perfil.userId, foto: perfil.foto, niver: '', id_onesignal: '' }
        axios.post('http://liberapp.com.br/api/cadUser', dados)
            .then(function (response) {
                if (response.data.status == 0 || response.data.status == "0") {
                    let newData = { "server_foto": response.data.url_foto, "server_id": response.data.user_id, "user_pro": false, "logado": true };
                    _this._initDataToStorage(newData, perfil);
                } else {
                    Alert.alert("Houve um erro ao lhe cadastrar no sistema. Tente mais tarde");
                }
            })
            .catch(function (error) {
                Alert.alert("Houve um erro ao lhe cadastrar no sistema. Tente mais tarde");
            });
    }

    _loadImage(profile, credentials) {
        var _this = this;
        let dataP = JSON.parse(profile);
        var url = 'https://graph.facebook.com/v2.3/' + credentials.userId + '/picture?width=300&redirect=false&access_token=' + credentials.token;

        fetch(url).then((response) => response.json())
            .then((responseData) => {
                let perfil = { "nome": dataP.name, "email": dataP.email, "foto": responseData.data.url, "userId": credentials.userId, "token": credentials.token };
                _this._validaLogin(perfil, credentials);//loga o usuario com o do BD ou cadastra
            }).done();
    }

    render() {
        return (
            <Image source={require('../imgs/bg_3.jpg')} style={sty.bgImg}>
                <View style={sty.boxGeral}>

                    <Image source={require('../imgs/logo_liber.png')} style={sty.logo} />

                    <TouchableHighlight style={sty.btn} onPress={() => this._loginFacebook()} underlayColor="#3B5998">
                        <Text style={sty.text}>Entrar com Facebook</Text>
                    </TouchableHighlight>

                </View>
            </Image>
        );
    };
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
        marginBottom: 200,
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