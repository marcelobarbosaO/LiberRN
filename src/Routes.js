import React, { Component } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import BuscaScreen from './components/BuscaScreen';
import PerfilScreen from './components/PerfilScreen';
import MeusAnunciosScreen from './components/MeusAnunciosScreen';
import ListaDesejoScreen from './components/ListaDesejoScreen';
import NovoDesejoScreen from './components/ListaDesejo/NovoDesejo';
import EditarDesejoScreen from './components/ListaDesejo/EditarDesejo';
import MensagensScreen from './components/MensagensScreen';
import AnunciarScreen from './components/Anuncio/AnunciarScreen';
import EditarAnuncio from './components/Anuncio/EditarAnuncio';
import AnuncioScreen from './components/AnuncioScreen';
import AnuncioParceiroScreen from './components/AnuncioParceiroScreen';
import Chat from './components/Mensagens/Chat';
import Slides from './components/SlidesApresentacao/Slides';
import IconMenu from './components/Outros/IconMenu';

const sty = StyleSheet.create({
    logo: { width: 100, height: 31 }
});

class Routes extends Component{
    constructor(props){
        super(props);
    }

    _back(){
        return false;
    }

    render(){
        return(
            <Router navigationBarStyle={{ backgroundColor: '#FFF' }} onExitApp={ () => this._back() }>
                <Scene key="root">
                    <Scene key="LoginScreen" title="Login" component={LoginScreen} hideNavBar={true} initial />
                    <Scene key="HomeScreen" title="Home" component={HomeScreen} hideNavBar={true} />
                    <Scene key="BuscaScreen" title="Resultados da Busca" component={BuscaScreen} hideNavBar={true} />
                    <Scene key="PerfilScreen" title="Perfil" component={PerfilScreen} hideNavBar={true} />
                    <Scene key="MeusAnunciosScreen" title="Meus Anúncios" component={MeusAnunciosScreen} hideNavBar={true} />
                    <Scene key="ListaDesejoScreen" title="Lista de Desejo" component={ListaDesejoScreen} hideNavBar={true} />
                    <Scene key="MensagensScreen" title="Mensagens" component={MensagensScreen} hideNavBar={true} />
                    <Scene key="AnunciarScreen" title="Anunciar" component={AnunciarScreen} hideNavBar={true} />
                    <Scene key="EditarAnuncioScreen" title="Editar Anuncio" component={EditarAnuncio} hideNavBar={true} />
                    <Scene key="AnuncioScreen" title="Anuncio" component={AnuncioScreen} hideNavBar={true} />
                    <Scene key="AnuncioParceiroScreen" title="Anuncio Parceiro" component={AnuncioParceiroScreen} hideNavBar={true} />
                    
                    <Scene key="NovoDesejoScreen" title="Novo Desejo" component={NovoDesejoScreen} hideNavBar={true} />
                    <Scene key="EditarDesejoScreen" title="Novo Desejo" component={EditarDesejoScreen} hideNavBar={true} />
                    <Scene key="ChatScreen" title="Chat" component={Chat} hideNavBar={true} />
                    <Scene key="SlidesScreen" title="Bem Vindo" component={Slides} hideNavBar={true} />
                </Scene>
            </Router>
        );
    }
}
export default Routes;