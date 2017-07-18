import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, FlatList, Alert, ActivityIndicator, TouchableHighlight } from 'react-native';
import axios from 'axios';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import BoxAnuncio from './BoxAnuncio';
import Loading from '../Outros/Loading';
import ErrorNetwork from '../Outros/ErrorNetwork';
import Separator from '../Outros/Separator';

class Vender extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, data: [], errorNetWork: false, errorNumber: 0 };
        if (this.props.profile.length > 0 && this.props.profile != []) {
            this._loadItemsVenda();
        } else {
            this.checkUser();
        }
        this.reloadFuncaoVender = this.reloadFuncaoVender.bind(this);
        this.deleteAnuncioVender = this.deleteAnuncioVender.bind(this);
    }

    checkUser() {
        if (this.props.profile.length > 0 && this.props.profile != []) {
            this._loadItemsVenda();
        } else {
            let self = this;
            setTimeout(function () {
                self.checkUser();
            }, 300);
        }
    }

    _loadItemsVenda() {
        let perf = JSON.parse(this.props.profile);
        axios.post('http://liberapp.com.br/api/meus_anuncios', { id: perf.server_response.server_id, filtro: 3 })
            .then((response) => {
                //remove o load e insere os dados no state
                if (response.data.status == 0 || data.status == "0") {
                    this.setState({ data: response.data.lista, loading: false, errorNetWork: false });
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

    reloadFuncaoVender(){
        this.setState({ loading: true, errorNetWork: false, errorNumber: 0 });
        this._loadItemsVenda();
    }

    deleteAnuncioVender(id){
        //alert(id);
        Alert.alert(
            'Tem certeza que deseja excluir?',
            'O anúncio será excluído permanentemente',
            [
                {text: 'Não', onPress: () => false, style: 'cancel'},
                {text: 'Sim', onPress: () => this.removeAnuncioServer(id)},
            ],
            { cancelable: false }
        )
    }

    removeAnuncioServer(id){
        axios.post('http://liberapp.com.br/api/remove_livro', { id: id })
            .then((response) => {
                //remove o load e insere os dados no state
                if (response.data.status == 0 || data.status == "0") {
                    Actions.MeusAnunciosScene({type: ActionConst.RESET});
                } else {
                    Alert.alert('Houve um erro ao remover seu anúncio.');
                }
            }).catch((data) => {
                if (data == 'Error: Network Error') {
                    Alert.alert('Houve um erro de conexao com a internet');
                } else {
                    Alert.alert('Houve um erro de conexao se comunicar com o servidor');
                }
            });
    }

    _loadVender() {
        if (this.state.loading) {
            return (
                <Loading />
            )
        } else {
            if (this.state.errorNetWork) {
                return(
                    <ErrorNetwork error={{erro: this.state.errorNumber}} reloadFuncao={this.reloadFuncaoVender}/>
                )
            } else {
                return (
                    <FlatList
                        data={this.state.data}
                        ItemSeparatorComponent={Separator}
                        renderItem={
                            (item) => <BoxAnuncio key={item.id} id={item.id} {...item} deleteAnuncio={this.deleteAnuncioVender}/>
                        }
                    />
                );
            }
        }
    }

    render() {
        return (
            <View style={[sty.boxGeral, { backgroundColor: (this.state.errorNetWork) ? '#fff':"#eee"}]}>
                {this._loadVender()}
                <TouchableHighlight onPress={ () => false } underlayColor="transparent" style={{ paddingVertical: 10, paddingHorizontal:15, backgroundColor:'#2D3B49', borderRadius: 100, position:'absolute', bottom:5, right: 5}}>
                    <Icon name="md-add" size={25} color="#fff"/>    
                </TouchableHighlight>
            </View>
        );
    }
};

const sty = StyleSheet.create({
    boxGeral: { flex: 1, paddingBottom: 50 }
})

const mapStateToProps = state => ({
    profile: state.AppReducer.profile
});

export default connect(mapStateToProps, {})(Vender);