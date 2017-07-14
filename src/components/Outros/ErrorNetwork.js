import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';

const est = StyleSheet.create({
    boxGeral: {
        flex: 1
    },
    centerText: { flex: 1 },
    btn: { backgroundColor: '#2B3845', paddingVertical: 10, paddingHorizontal: 25, borderRadius: 10, borderWidth:1, borderColor:'#2B3845' },
    txtBtn:{ color: '#FFF'},
    boxTopo: { flex: 1, alignItems: 'center', justifyContent: 'space-around' }
});

class ErrorNetwork extends Component {
    constructor(props) {
        super(props);
    }

    _loadError() {
        switch (this.props.error.erro) {
            case 0:
                return (
                    <View style={est.boxTopo}>
                        <Text style={est.centerText}>Houve um erro na requisição.</Text>
                        <TouchableHighlight onPress={() => this.props.reloadFuncao()} style={est.btn} underlayColor="#2B3845">
                            <Text style={est.txtBtn} >Tentar Novamente</Text>
                        </TouchableHighlight>
                    </View>
                )
            case 1:
                return (
                    <View style={est.boxTopo}>
                        <Text>Não Vieram Dados</Text>
                    </View>
                )
            case 2:
                return (
                    <View style={est.boxTopo}>
                        <Text>Houve um erro na requisição. Verifique sua internet</Text>
                        <TouchableHighlight onPress={() => this.props.reloadFuncao()} style={est.btn} underlayColor="#2B3845">
                            <Text style={est.txtBtn} >Tentar Novamente</Text>
                        </TouchableHighlight>
                    </View>
                )
            default:
                return (
                    <View style={est.boxTopo}>
                        <Text>Houve um erro na requisição.</Text>
                        <TouchableHighlight onPress={() => this.props.reloadFuncao()} style={est.btn} underlayColor="#2B3845">
                            <Text style={est.txtBtn} >Tentar Novamente</Text>
                        </TouchableHighlight>
                    </View>
                )
        }
    }

    render() {
        return (
            <View style={est.boxGeral}>
                <View style={{ flex: 1, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' }}>
                    {this._loadError()}
                </View>
                <View style={{ flex: 4 }}>
                    <Image source={require('../../imgs/bg_error.jpg')} style={{ width: null, height: null, flex: 1, resizeMode: 'contain' }} />
                </View>
            </View>
        );
    }
}

export default ErrorNetwork;