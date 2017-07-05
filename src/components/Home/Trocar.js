import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, FlatList, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';

import BoxAnuncioDoar from './BoxAnuncioDoar';

class Vender extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, data: [] };
        this._loadItemsTrocar();
    }

    _loadItemsTrocar() {
        let perf = JSON.parse(this.props.profile);
        axios.post('http://liberapp.com.br/api/publicacoes', { id: perf.server_response.server_id, filtro: 2 })
            .then((response) => {
                //remove o load e insere os dados no state
                if (response.data.status == 0 || data.status == "0") {
                    this.setState({ data: response.data.livros, loading: false });
                } else {
                    Alert.alert(
                        'Ops...',
                        'Houve um erro na requisição. Tente mais tarde.'
                    );
                }
            }).catch((data) => {
                if (data == 'Error: Network Error') {
                    Alert.alert("Você está sem conexão com a internet.");
                } else {
                    Alert.alert(
                        'Ops...',
                        'Houve um erro, ao recuperar as clinicas. Tente novamente mais tarde.'
                    );
                }
            });
    }

    _loadTrocar() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#10817F" />
                    <Text>Carregando. Aguarde...</Text>
                </View>
            )
        } else {
            return (
                <FlatList
                    data={this.state.data}
                    renderItem={
                        (item) => <BoxAnuncioDoar key={item.id} id={item.id} {...item} />
                    }
                />
            );
        }
    }

    render() {
        return (
            <View style={sty.boxGeral}>
                { this._loadTrocar() }
            </View>
        );
    }
};

const sty = StyleSheet.create({
    boxGeral: { flex: 1, backgroundColor: "#eee" }
})

const mapStateToProps = state => ({
    profile: state.AppReducer.profile
});

export default connect(mapStateToProps, {})(Vender);