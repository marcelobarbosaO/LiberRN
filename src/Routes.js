import React from 'react';
import { StyleSheet } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import PerfilScreen from './components/PerfilScreen';

import IconMenu from './components/Outros/IconMenu';

const sty = StyleSheet.create({
    logo:{
        width:100,
        height:31
    }
});

export default props => (
    <Router navigationBarStyle={{ backgroundColor: '#FFF' }} >
        <Scene key="root">
            <Scene key="LoginScreen" title="Login" component={LoginScreen} hideNavBar={true} initial />
            <Scene key="HomeScreen" title="Home" component={HomeScreen} hideNavBar={true} />
            <Scene key="PerfilScreen" title="Perfil" component={PerfilScreen} hideNavBar={true} />
        </Scene>
    </Router>
);