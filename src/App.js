import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import OneSignal from 'react-native-onesignal';

import Routes from './Routes';//importa as rotas
import reducers from './reducers/index';//importa os reducers do app

class App extends Component {
    componentWillMount(){
        OneSignal.addEventListener('ids', this.onIds);
        OneSignal.addEventListener('registered', this.onRegistered);
    }

    componentWillUnmount(){
        OneSignal.removeEventListener('registered', this.onRegistered);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onRegistered(notifData) {
        console.log("Device had been registered for push notifications!", notifData);
    }

    onIds(device) {
        console.log('Device info: ', device);
        AsyncStorage.setItem("onesignal_token", JSON.stringify(device));
    }

    render() {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <Routes />
            </Provider>
        );
    }
};

export default App;