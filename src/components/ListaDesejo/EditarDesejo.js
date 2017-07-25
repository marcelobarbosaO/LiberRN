import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableHighlight, TextInput, StyleSheet, Platform, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import { Actions, ActionConst } from 'react-native-router-flux';
import axios from 'axios';

import Loading from '../Outros/Loading';
import ErrorNetwork from '../Outros/ErrorNetwork';

class EditarDesejo extends Component {
    constructor(props) {
        super(props);
        this.state = { titulo: this.props.item.titulo, imageLivro: '', tela: 1, loadLivros: false, listaImages: [], width: 0, height: 0, imageKey: '' };

    }

    componentDidMount() {
        this.setState({ width: Dimensions.get('window').width, height: Dimensions.get('window').height });
    }

    _loadImages() {
        this.setState({ tela: 2 });
        axios.get('https://www.googleapis.com/customsearch/v1?q=livro ' + this.state.titulo + '&key=AIzaSyBuxvj0nliU8_eWzAASkDsfSx48cjaw38o&cx=017107883319252974336:tdd_f_zwrym&searchType=image&enableImageSearch=true&disableWebSearch=true&imgSize=large')
            .then((response) => {
                //remove o load e insere os dados no state
                // alert(JSON.stringify(response.data));
                if (response.data.items != undefined && response.data.items.length > 0) {
                    this.setState({ loadLivros: true, listaImages: response.data.items });
                } else {
                    Alert.alert('Houve um erro ao remover esse item.');
                }
            }).catch((data) => {
                if (data == 'Error: Network Error') {
                    Alert.alert('Houve um erro de conexao com a internet');
                } else {
                    Alert.alert(data);
                }
            });
    }

    _escolheImagem(item){
        this.setState({imageLivro:item.link, imageKey: 'image-' + item.image.byteSize });
    }

    _loadData() {
        if (!this.state.loadLivros) {
            return (
                <Loading />
            )
        } else {
            if (this.state.listaImages.length > 0) {
                return (
                    <ScrollView >
                        <View style={{ alignItems: 'center', paddingVertical: 15 }}>
                            <Text style={est.Tit}>Escolha a miniatura do Livro</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 50 }}>
                            {
                                this.state.listaImages.map((item) => {
                                    return (
                                        <View style={{ width: (this.state.width / 3), marginTop: 10, alignItems: 'center' }} key={'tt-' + item.image.byteSize}>
                                            <TouchableHighlight onPress={() => this._escolheImagem(item) }>
                                                <Image key={'image-' + item.image.byteSize} indicator={Progress.Circle} indicatorProps={{ showsText: true }} source={{ uri: item.link, width: 70, height: 110 }} style={[est.image, (this.state.imageKey == 'image-'+item.image.byteSize) ? est.borderActive:est.borderNotActive]} />
                                            </TouchableHighlight>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                )
            } else {
                return (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={est.txtDet}>Nenhuma Imagem Encontrada</Text>
                    </View>
                )
            }
        }
    }

    _saveDesejo(){
        if(this.state.imageLivro == ''){
            Alert.alert('Escolha uma miniatura antes de concluir');
        } else {
            axios.post('http://liberapp.com.br/api/edit_desejo',{ id: this.props.item.id, texto: this.state.titulo, foto: this.state.imageLivro})
            .then((response) => {
                if (response.data.status == 0 || response.data.status == "0") {
                    Actions.ListaDesejoScreen({type: ActionConst.RESET});
                } else {
                    Alert.alert('Houve um erro ao salvar o anuncio. Tente mais tarde');
                    Actions.ListaDesejoScreen({type: ActionConst.RESET});
                }
            }).catch((data) => {
                if (data == 'Error: Network Error') {
                    Alert.alert('Houve um erro de conexao com a internet');
                    Actions.ListaDesejoScreen({type: ActionConst.RESET});
                } else {
                    Alert.alert('Houve um erro ao salvar o anuncio. Tente mais tarde');
                    Actions.ListaDesejoScreen({type: ActionConst.RESET});
                }
            });
        }
    }

    _loadBotoes() {
        if (this.state.tela == 1) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <Sae
                        label={'Título do livro desejado'}
                        iconClass={FontAwesomeIcon}
                        iconName={'pencil'}
                        iconColor={'black'}
                        // TextInput props
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        inputStyle={{ color: '#000', fontSize: 13 }}
                        labelStyle={{ color: '#000', fontSize: 13 }}
                        value={this.state.titulo}
                        onChangeText={(text) => this.setState({ titulo: text })}
                    />
                    <TouchableHighlight onPress={() => Actions.ListaDesejoScreen({type: ActionConst.RESET}) } style={est.btnCancel} underlayColor="transparent">
                        <Icon name="md-close" size={25} color="#FFF" />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this._loadImages()} style={est.btnConfirm} underlayColor="transparent">
                        <Icon name="md-arrow-round-forward" size={25} color="#FFF" />
                    </TouchableHighlight>
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    {this._loadData()}
                    <TouchableHighlight onPress={() => this.setState({ tela: 1 })} style={est.btnCancel} underlayColor="transparent">
                        <Icon name="md-arrow-round-back" size={25} color="#FFF" />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this._saveDesejo() } style={est.btnConfirm} underlayColor="transparent">
                        <Icon name="md-checkmark" size={25} color="#FFF" />
                    </TouchableHighlight>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={[est.boxGeral]} >
                <View style={est.ToolBar}>
                    <TouchableHighlight onPress={() => { Actions.ListaDesejoScreen({type: ActionConst.RESET}) }} underlayColor="#FFF" style={{ flex: .7 }}>
                        <View style={{ flex: .7 }}>
                            <Icon name="md-arrow-round-back" size={20} color="#2B3845" />
                        </View>
                    </TouchableHighlight>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={{ fontSize: (Platform.OS == 'ios') ? 15 : 17, color: '#2B3845', fontWeight: 'bold' }}>Editar Desejo</Text>
                    </View>
                    <View style={{ flex: .5, alignItems: "flex-end" }}>
                    </View>
                </View>

                <View style={est.content}>
                    {this._loadBotoes()}
                </View>
            </View>
        );
    }
}

const font = '';
if (Platform.OS == 'ios')
    font = 'OpenSans';
else
    font = 'OpenSans-Regular';

const est = StyleSheet.create({
    boxGeral: { flex: 1, paddingBottom: 0, backgroundColor: '#eee' },
    ToolBar: { paddingTop: (Platform.OS === 'ios') ? 20 : 0, height: 50, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, backgroundColor: "#FFF" },
    content: { backgroundColor: '#eee', flex: 1 },
    btnCancel: { position: 'absolute', bottom: 7, left: 7, paddingVertical: 9, paddingHorizontal: 15, backgroundColor: '#f00', borderRadius: 50 },
    btnConfirm: { position: 'absolute', bottom: 7, right: 7, paddingVertical: 9, paddingHorizontal: 15, backgroundColor: '#00cc00', borderRadius: 50 },
    Tit: { fontSize: (Platform.OS === 'ios') ? 14 : 16, fontFamily: font },
    image: { width: 74, height: 114, backgroundColor: '#000', borderWidth: 2 },
    borderNotActive:{ 
        borderColor:'#eee', 
        transform:[{scale: 1}],
        position:'relative',
        zIndex:10
    },
    borderActive:{ borderColor:'#f00',position:'relative', transform:[{scale: 1.2}], zIndex:99}
});

export default EditarDesejo;