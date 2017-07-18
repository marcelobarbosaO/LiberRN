import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Platform, Image, Alert, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import axios from 'axios';

import Loading from '../Outros/Loading';
import ErrorNetwork from '../Outros/ErrorNetwork';
import BoxDesejo from './BoxDesejo';
import Separator from '../Outros/Separator';

const userProfile = [];
class Index extends Component {
    constructor(props){
        super(props);
        this.state = { loadData: false, lista: [], errorNetWork: false, errorNumber: 0 };
        this.userProfile = JSON.parse(this.props.profile);
        this._loadLista();

        this.deleteItemDesejo = this.deleteItemDesejo.bind(this);
    }

    static contextTypes = { drawer: React.PropTypes.object }

    _openMenu() {
        this.context.drawer.open();
    }

    _loadLista() {
        axios.post('http://liberapp.com.br/api/lista_desejo', { user_id: this.userProfile.server_response.server_id })
            .then((response) => {
                //remove o load e insere os dados no state
                //alert(JSON.stringify(response));
                if (response.data.status == 0 || data.status == "0") {
                    this.setState({ loadData: true, lista: response.data.lista });
                } else {
                    Alert.alert(
                        'Ops...',
                        'Houve um erro na requisição. Tente mais tarde.'
                    );
                }
            }).catch((data) => {
                if (data == 'Error: Network Error') {
                    this.setState({ loadData: true, errorNetwork: true });
                    Alert.alert("Você está sem conexão com a internet.");
                } else {
                    this.setState({ loadData: true, errorNetwork: true });
                    Alert.alert(
                        'Ops...',
                        'Houve um erro, ao recuperar sua lista de desejo. Tente novamente mais tarde.'
                    );
                }
            });
    }
    
    deleteItemDesejo(id){
        //alert(id);
        Alert.alert(
            'Tem certeza que deseja excluir?',
            'O item será excluído permanentemente',
            [
                {text: 'Não', onPress: () => false, style: 'cancel'},
                {text: 'Sim', onPress: () => this.removeItemDesejo(id)},
            ],
            { cancelable: false }
        )
    }

    removeItemDesejo(id){
        axios.post('http://liberapp.com.br/api/delete_desejo', { id: id })
            .then((response) => {
                //remove o load e insere os dados no state
                if (response.data.status == 0 || data.status == "0") {
                    Actions.ListaDesejoScreen({type: ActionConst.RESET});
                } else {
                    Alert.alert('Houve um erro ao remover esse item.');
                }
            }).catch((data) => {
                if (data == 'Error: Network Error') {
                    Alert.alert('Houve um erro de conexao com a internet');
                } else {
                    Alert.alert('Houve um erro de conexao se comunicar com o servidor');
                }
            });
    }

    _loadTela(){
        if(this.state.loadData){
            if (this.state.errorNetWork) {
                return(
                    <ErrorNetwork error={{erro: this.state.errorNumber}} reloadFuncao={this.reloadFuncaoVender}/>
                )
            } else {
                return(
                    <FlatList
                            data={this.state.lista}
                            ItemSeparatorComponent={Separator}
                            renderItem={
                                (item) => <BoxDesejo key={item.id} id={item.id} {...item} deleteItem={this.deleteItemDesejo}/>
                            }
                    />
                );
            }
        } else {
            return(
                <Loading />
            );
        }
    }

    render(){
        return(
            <View style={est.boxGeral}>
                <View style={est.ToolBar}>
                    <View style={{ flex: .7 }}>
                        <TouchableHighlight onPress={() => { this._openMenu() }} underlayColor="#FFF">
                            <Icon name="md-menu" size={20} color="#2B3845" />
                        </TouchableHighlight>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={{ fontSize: (Platform.OS == 'ios') ? 15 : 17, color: '#2B3845', fontWeight: 'bold' }}>Lista de Desejo</Text>
                    </View>
                    <View style={{ flex: .5, alignItems: "flex-end" }}>
                    </View>
                </View>
                { this._loadTela() }
                <TouchableHighlight onPress={ () => false } underlayColor="transparent" style={{ paddingVertical: 10, paddingHorizontal:15, backgroundColor:'#2D3B49', borderRadius: 100, position:'absolute', bottom:5, right: 5}}>
                    <Icon name="md-add" size={25} color="#fff"/>    
                </TouchableHighlight>
            </View>
        );
    }
}

const est = StyleSheet.create({
    boxGeral:{ flex: 1, backgroundColor:'#eee', paddingBottom: 50},
    ToolBar: { paddingTop: (Platform.OS === 'ios') ? 20 : 0, height: 50, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, backgroundColor: "#FFF" },
    content: { backgroundColor: '#eee', flex: 1 },
    imgUser: { margin: -7, borderRadius: (Platform.OS == 'ios') ? 0 : 100, borderWidth: (Platform.OS == 'ios') ? 0 : 7, borderColor: "rgba(0,0,0,0.5)" },
    boxTopo: { paddingVertical: 25, alignItems: "center" },
});

const mapStateToProps = state => ({
    profile: state.AppReducer.profile
});
export default connect(mapStateToProps, {})(Index);