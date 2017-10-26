import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, FlatList, Alert, TouchableHighlight, ActivityIndicator, RefreshControl, Platform, Modal, Dimensions, Picker, TextInput } from 'react-native';
import ModalPicker from 'react-native-modal-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { connect } from 'react-redux';

import { URL_API } from '../../types';
import BoxAnuncioDoar from './BoxAnuncioDoar';
import Loading from '../Outros/Loading';
import ErrorNetwork from '../Outros/ErrorNetwork';

class Trocar extends Component {
    constructor(props) {
        super(props);
        this.state = { refreshing:false, loading: true, data: [], errorNetWork: false, errorNumber: 0, filtro_ativado: false, cidade_id: null, estado_id: null, cidade: '', estado: '', lista_estados: [], lista_cidades: [], visible: false };
        this._loadItemsTrocar();
        this.reloadFuncaoTrocar = this.reloadFuncaoTrocar.bind(this);
    }

    _loadItemsTrocar() {
        let perf = JSON.parse(this.props.profile);
        axios.post('http://liberapp.com.br/api/publicacoes', { id: perf.server_response.server_id, filtro: 2, filtro_ativado:this.state.filtro_ativado, cidade_id: this.state.cidade_id })
            .then((response) => {
                //remove o load e insere os dados no state
                if (response.data.status == 0 || response.data.status == "0") {
                    this.setState({ refreshing: false, data: response.data.livros, loading: false, errorNetWork: false });
                } else {
                    this.setState({ refreshing: false, loading: false, errorNetWork: true, errorNumber: 3 });
                }
            }).catch((data) => {
                if (data == 'Error: Network Error') {
                    this.setState({ refreshing: false, loading: false, errorNetWork: true, errorNumber: 2 });
                } else {
                    this.setState({ refreshing: false, loading: false, errorNetWork: true, errorNumber: 0 });
                }
            });

            axios.get(URL_API + "lista_estados")
            .then(resp => {
                let arr = [{ key: 0, label: 'Todos os Estados' }];
                let neu = arr.concat(resp.data.estados);
                this.setState({ lista_estados: neu });
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
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                        }
                        renderItem={
                            (item) => <BoxAnuncioDoar key={item.id} id={item.id} {...item} />
                        }
                    />
                );
            }
        }
    }

    reloadFuncaoTrocar() {
        this.setState({ refreshing: true, loading: true, errorNetWork: false, errorNumber: 0 });
        this._loadItemsTrocar();
    }

    _onRefresh() {
        this.setState({ refreshing: true, loading: true, errorNetWork: false, errorNumber: 0});
        this._loadItemsTrocar();
    }

    loadCidades(id) {
        if (id == 0) {
            this.setState({ cidade:'Todas as Cidades', cidade_id: 0, lista_cidades:[], filtro_ativado:false });
        } else {
            axios.get(URL_API + "cidades/" + id)
                .then(resp => {
                    let arr = [{ key: 0, label: 'Todas as Cidades'}];
                    let neu = arr.concat(resp.data.cidades);
                    this.setState({ filtro_ativado:true, cidade_id: resp.data.cidades[0].key, cidade: resp.data.cidades[0].label, lista_cidades: neu });
                });
        }
    }

    show_pickers() {
        if (Platform.OS == 'ios') {
            return (
                <View>
                    <ModalPicker
                        data={this.state.lista_estados}
                        initValue={this.state.estado}
                        onChange={(option) => { this.loadCidades(option.key); this.setState({ estado_id: option.key, estado: option.label }) }}>

                        <TextInput
                            style={sty.input}
                            editable={false}
                            underlineColorAndroid="transparent"
                            placeholder="Selecione um estado"
                            value={this.state.estado} />

                    </ModalPicker>

                    <ModalPicker
                        data={this.state.lista_cidades}
                        initValue={this.state.cidade}
                        onChange={(option) => { this.setState({ cidade_id: option.key, cidade: option.label }) }}>

                        <TextInput
                            style={sty.input}
                            editable={false}
                            underlineColorAndroid="transparent"
                            placeholder="Selecione uma cidade"
                            value={this.state.cidade} />

                    </ModalPicker>
                </View>
            )
        } else {
            return (
                <View>
                    <Picker
                        style={sty.inputBtn}
                        selectedValue={this.state.estado}
                        onValueChange={(itemValue, itemIndex) => { this.loadCidades(option.key); this.setState({ estado_id: itemIndex, estado: itemValue }) }}>
                        <Picker.Item label="Escolha um estado" value="0" />
                        {
                            this.state.lista_estados.map((item) => {
                                return (
                                    <Picker.Item key={item.key} label={item.label} value={item.label} />
                                )
                            })
                        }
                    </Picker>
                    <Picker
                        style={sty.inputBtn}
                        selectedValue={this.state.cidade}
                        onValueChange={(itemValue, itemIndex) => this.setState({ cidade_id: itemIndex, cidade: itemValue })}>
                        <Picker.Item label="Escolha uma cidade" value="0" />
                        {
                            this.state.lista_cidades.map((item) => {
                                return (
                                    <Picker.Item key={item.key} label={item.label} value={item.label} />
                                )
                            })
                        }
                    </Picker>
                </View>
            )
        }
    }

    filtrar() {
        let self = this;
        this.setState({ visible: false});
        setTimeout( () => {
            self.reloadFuncaoTrocar();
        },200);
    }

    render() {
        return (
             <View style={[sty.boxGeral, { backgroundColor: (this.state.errorNetWork) ? '#fff':"#eee"}]}>
                {this._loadTrocar()}
                <TouchableHighlight onPress={() => this.setState({ visible: true })} underlayColor="#2B3845" style={{ width: 40, height: 40, backgroundColor: '#2B3845', borderRadius: 50, position: 'absolute', bottom: 15, right: 15, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name="ios-funnel" size={24} color="#FFF" style={{ backgroundColor: 'transparent' }} style={{ paddingTop: 5 }} />
                </TouchableHighlight>
                <Modal onRequestClose={() => false} visible={this.state.visible} transparent>
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', flex: 1, justifyContent: 'flex-end' }}>
                        <View style={{ padding: 20, backgroundColor: "#FFF", width: Dimensions.get('window').width }}>
                            {this.show_pickers()}
                            <View style={{ flexDirection: 'row', justifyContent:'flex-end' }}>
                                <TouchableHighlight onPress={() => this.filtrar()} underlayColor="#2B3845" style={{ paddingVertical: 12, paddingHorizontal: 30, backgroundColor: '#2B3845', borderRadius: 4 }}>
                                    <Text style={{ color: "#FFF" }}>Ok</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
};

const sty = StyleSheet.create({
    boxGeral: { flex: 1 },
    inputBtn: {
        height: 40, marginBottom: 15, backgroundColor: "#CCC", borderWidth: 1, borderColor: "#000",
        paddingHorizontal: (Platform.OS == 'ios') ? 15 : 12, justifyContent: 'center'
    },
    input: {
        height: 40, marginBottom: 15, backgroundColor: "#CCC", borderWidth: 1, borderColor: "#000",
        paddingHorizontal: (Platform.OS == 'ios') ? 15 : 12, fontSize: 16, color: '#2B3845'
    }
})

const mapStateToProps = state => ({
    profile: state.AppReducer.profile
});

export default connect(mapStateToProps, {})(Trocar);