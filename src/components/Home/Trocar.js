import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, FlatList, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';

import BoxAnuncioDoar from './BoxAnuncioDoar';
import Loading from '../Outros/Loading';
import ErrorNetwork from '../Outros/ErrorNetwork';

class Vender extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, data: [], errorNetWork: false, errorNumber: 0 };
        this._loadItemsTrocar();
        this.reloadFuncaoTrocar = this.reloadFuncaoTrocar.bind(this);
    }

    _loadItemsTrocar() {
        let perf = JSON.parse(this.props.profile);
        axios.post('http://liberapp.com.br/api/publicacoes', { id: perf.server_response.server_id, filtro: 2 })
            .then((response) => {
                //remove o load e insere os dados no state
                if (response.data.status == 0 || data.status == "0") {
                    this.setState({ data: response.data.livros, loading: false, errorNetWork: false });
                } else {
                    this.setState({ loading: false, errorNetWork: true, errorNumber: 1 });
                }
            }).catch((data) => {
                if (data == 'Error: Network Error') {
                    this.setState({ loading: false, errorNetWork: true, errorNumber: 2 });
                } else {
                    this.setState({ loading: false, errorNetWork: true, errorNumber: 3 });
                }
            });
    }

    _loadTrocar() {
        if (this.state.loading) {
            return (
                <Loading />
            )
        } else {
            if (this.state.errorNetWork) {
                return (
                    <ErrorNetwork error={{ erro: this.state.errorNumber }} reloadFuncao={this.reloadFuncaoTrocar} />
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
    }

    reloadFuncaoTrocar() {
        this.setState({ loading: true, errorNetWork: false, errorNumber: 0 });
        this._loadItemsTrocar();
    }

    render() {
        return (
             <View style={[sty.boxGeral, { backgroundColor: (this.state.errorNetWork) ? '#fff':"#eee"}]}>
                {this._loadTrocar()}
            </View>
        );
    }
};

const sty = StyleSheet.create({
    boxGeral: { flex: 1 }
})

const mapStateToProps = state => ({
    profile: state.AppReducer.profile
});

export default connect(mapStateToProps, {})(Vender);