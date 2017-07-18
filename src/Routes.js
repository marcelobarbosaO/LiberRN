import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import PerfilScreen from './components/PerfilScreen';
import MeusAnunciosScreen from './components/MeusAnunciosScreen';
import ListaDesejoScreen from './components/ListaDesejoScreen';
import Slides from './components/SlidesApresentacao/Slides';
import IconMenu from './components/Outros/IconMenu';

const sty = StyleSheet.create({
    logo: {
        width: 100,
        height: 31
    }
});

export default props => (
    <Router navigationBarStyle={{ backgroundColor: '#FFF' }} >
        <Scene key="root">
            <Scene key="LoginScreen" title="Login" component={LoginScreen} hideNavBar={true} initial />
            <Scene key="HomeScreen" title="Home" component={HomeScreen} hideNavBar={true} />
            <Scene key="PerfilScreen" title="Perfil" component={PerfilScreen} hideNavBar={true} />
            <Scene key="MeusAnunciosScreen" title="Meus Anúncios" component={MeusAnunciosScreen} hideNavBar={true} />
            <Scene key="ListaDesejoScreen" title="Lista de Desejo" component={ListaDesejoScreen} hideNavBar={true} />

            <Scene key="SlidesScreen" title="Bem Vindo" component={Slides} hideNavBar={true} />
        </Scene>
    </Router>
);