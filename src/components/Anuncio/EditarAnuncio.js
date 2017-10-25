import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableHighlight, DeviceEventEmitter, Picker, TextInput, StyleSheet, Platform, ActivityIndicator, Dimensions, Modal, Alert, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalPicker from 'react-native-modal-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Imagee from 'react-native-image-progress';
import { connect } from 'react-redux';
import * as Progress from 'react-native-progress';
import { Actions, ActionConst } from 'react-native-router-flux';
import axios from 'axios';

import Loading from '../Outros/Loading';
import ErrorNetwork from '../Outros/ErrorNetwork';

const optBook = [
    { "key": 1, label: "Doar" },
    { "key": 2, label: "Trocar" },
    { "key": 3, label: "Vender" },
];

const selff = '';

class EditarAnuncio extends Component {
    constructor(props) {
        super(props);

        this.userProfile = JSON.parse(this.props.profile);

        this._loadCategorias();
        selff = this;

        this.state = { 
            widthScreen: Dimensions.get('window').width, 
            visible: false, 
            upImages: 0, 
            titulo: '', imageLivro: '', descricao: '', 
            preco: 0, tela: 1, optChoice: 0, optChoiceTxt: '', optTipo: 0, optTipoTxt: '', 
            listaCategs: [], loadLivros: false, 
            listaImages: [], width: 0, height: 0, 
            imageKey: '', listaImagesGallery: [] 
        };
    }

    componentDidMount() {
        this.setState({ 
            width: Dimensions.get('window').width, 
            height: Dimensions.get('window').height,
            titulo: this.props.item.titulo,
            descricao: this.props.item.descricao,
            imageLivro:this.props.item.foto
        });
    }

    _loadCategorias() {
        axios.get('http://liberapp.com.br/api/categorias')
            .then((response) => {
                if (response.data.status == 0 || response.data.status == "0") {
                    let arr = [];
                    for (let i = 0; i < response.data.lista.length; i++) {
                        let elm = { "key": response.data.lista[i].id, label: response.data.lista[i].nome };
                        arr.push(elm);
                    }
                    this.setState({ listaCategs: arr });
                }
            }).catch((error) => { });
    }

    _loadBotoes() {
        if (this.state.tela == 1) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <Sae
                        label={'Título do livro'}
                        iconClass={FontAwesomeIcon}
                        iconName={'pencil'}
                        iconColor={'black'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        inputStyle={{ color: '#000', fontSize: 13 }}
                        labelStyle={{ color: '#000', fontSize: 13 }}
                        value={this.state.titulo}
                        onChangeText={(text) => this.setState({ titulo: text })}
                    />
                    <Text style={{ fontWeight: 'bold', fontFamily: font, fontSize: 15, paddingTop: 50 }}>OBS:</Text>
                    <Text style={{ paddingTop: 10, fontSize: 13, lineHeight: 25, fontFamily: font }}>
                        Digite o título real do livro. Não coloque títulos de venda como "Vendo 5 livros,", "Vendo livro X", etc, pois assim fica mais fácil de pessoas encontrarem seu livro e na próxima etapa iremos achar imagens de miniatura baseados no título. Se você tiver mais de um livro, faça 1 anúncio de cada vez.
                    </Text>
                    <TouchableHighlight onPress={() => Actions.pop()} style={est.btnCancel} underlayColor="transparent">
                        <Icon name="md-close" size={25} color="#FFF" />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this._loadImages()} style={est.btnConfirm} underlayColor="transparent">
                        <Icon name="md-arrow-round-forward" size={25} color="#FFF" />
                    </TouchableHighlight>
                </View>
            )
        } else if (this.state.tela == 2) {
            return (
                <View style={{ flex: 1 }}>
                    {this._loadData()}
                    <TouchableHighlight onPress={() => this.setState({ tela: 1 })} style={est.btnCancel} underlayColor="transparent">
                        <Icon name="md-arrow-round-back" size={25} color="#FFF" />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this._validaImage()} style={est.btnConfirm} underlayColor="transparent">
                        <Icon name="md-arrow-round-forward" size={25} color="#FFF" />
                    </TouchableHighlight>
                </View>
            )
        } else if (this.state.tela == 3) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <TextInput 
                        placeholder="Descrição"
                        multiline={true}
                        numberOfLines={10}
                        style={{ height: 150, padding:15, borderWidth:1, borderColor:'#000', fontSize:16 }}
                        value={this.state.descricao}
                        onChangeText={(text) => this.setState({ descricao: text })}
                    />

                    {this._loadPickers()}

                    <TouchableHighlight onPress={() => this.setState({ tela: 2 })} style={est.btnCancel} underlayColor="transparent">
                        <Icon name="md-arrow-round-back" size={25} color="#FFF" />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this._validaTela3()} style={est.btnConfirm} underlayColor="transparent">
                        <Icon name="md-checkmark" size={25} color="#FFF" />
                    </TouchableHighlight>
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <View style={{ alignItems: 'center', paddingVertical: 15 }}>
                        <Text style={est.Tit}>Escolha/Envie Fotos do Livro</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableHighlight onPress={() => this._selectFotos()}>
                            <Text>Enviar Fotos</Text>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => this._takePhoto()}>
                            <Text>Tirar Foto</Text>
                        </TouchableHighlight>
                    </View>

                    {this._showImagesGallery()}

                    <TouchableHighlight onPress={() => this.setState({ tela: 3 })} style={est.btnCancel} underlayColor="transparent">
                        <Icon name="md-arrow-round-back" size={25} color="#FFF" />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this.salvaAnuncio()} style={est.btnConfirm} underlayColor="transparent">
                        <Icon name="md-checkmark" size={25} color="#FFF" />
                    </TouchableHighlight>
                </View>
            )
        }
    }

    render(){
        return (
            <View style={[est.boxGeral]} >
                <View style={est.ToolBar}>
                    <TouchableHighlight onPress={() => { Actions.pop() }} underlayColor="#FFF" style={{ flex: .7 }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Icon name="md-arrow-round-back" size={20} color="#2B3845" />
                        </View>
                    </TouchableHighlight>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={{ fontSize: (Platform.OS == 'ios') ? 15 : 17, color: '#2B3845', fontWeight: 'bold' }}>Editar Anúncio</Text>
                    </View>
                    <View style={{ flex: .5, alignItems: "flex-end" }}>
                    </View>
                </View>

                <View style={est.content}>
                    {this._loadBotoes()}
                </View>
                <Modal visible={this.state.visible} transparent={true} onRequestClose={() => false}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator size="large" color="#FFF" />
                            <Text style={{ color: '#FFF' }}>Carregando. Aguarde...</Text>
                        </View>
                    </View>
                </Modal>
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
    borderNotActive: {
        borderColor: '#eee',
        transform: [{ scale: 1 }],
        position: 'relative',
        zIndex: 10
    },
    picker: {
        backgroundColor: "#EFEFEF",
        height: 50,
        padding: 0,
        margin: 0

    },
    borderActive: { borderColor: '#f00', position: 'relative', transform: [{ scale: 1.2 }], zIndex: 99 }
});

const mapStateToProps = state => ({
    profile: state.AppReducer.profile
});
export default connect(mapStateToProps, {})(EditarAnuncio);