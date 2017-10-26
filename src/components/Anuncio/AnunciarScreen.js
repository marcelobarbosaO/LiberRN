import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableHighlight, DeviceEventEmitter, Picker, TextInput, StyleSheet, Platform, ActivityIndicator, Dimensions, Modal, Alert, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalPicker from 'react-native-modal-picker';
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
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

class Anunciar extends Component {
    constructor(props) {
        super(props);
        this.userProfile = JSON.parse(this.props.profile);
        this._loadCategorias();
        selff = this;
        this.state = { widthScreen: Dimensions.get('window').width, visible: false, upImages: 0, titulo: '', imageLivro: '', descricao: '', preco: 0, tela: 1, optChoice: 0, optChoiceTxt: '', optTipo: 0, optTipoTxt: '', listaCategs: [], loadLivros: false, listaImages: [], width: 0, height: 0, imageKey: '', listaImagesGallery: [] };
    }

    componentDidMount() {
        this.setState({ width: Dimensions.get('window').width, height: Dimensions.get('window').height });
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

    _escolheImagem(item) {
        this.setState({ imageLivro: item.link, imageKey: 'image-' + item.image.byteSize });
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
                                            <TouchableHighlight onPress={() => this._escolheImagem(item)}>
                                                <Imagee key={'image-' + item.image.byteSize} indicator={Progress.Circle} indicatorProps={{ showsText: true }} source={{ uri: item.link, width: 70, height: 110 }} style={[est.image, (this.state.imageKey == 'image-' + item.image.byteSize) ? est.borderActive : est.borderNotActive]} />
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

    _validaImage() {
        if (this.state.imageLivro != '')
            this.setState({ tela: 3 });
        else
            Alert.alert("Escolha uma miniatura antes de continuar");
    }

    _loadPickers() {
        if (Platform.OS === 'ios') {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ borderWidth: 1, borderColor: "#000", marginTop: 15 }}>
                        <ModalPicker
                            style={{ height: 45, margin: 0, padding: 0, backgroundColor: "#EFEFEF" }}
                            data={optBook}
                            initValue={this.state.optChoiceTxt}
                            onChange={(option) => { this.setState({ optChoice: option.key, optChoiceTxt: option.label }) }}>

                            <TextInput
                                style={{ padding: 10, height: 45 }}
                                editable={false}
                                placeholder="Tipo de Anúncio"
                                value={this.state.optChoiceTxt} />

                        </ModalPicker>
                    </View>

                    <View style={{ borderWidth: 1, borderColor: "#000", marginTop: 15 }}>
                        <ModalPicker
                            style={{ height: 45, margin: 0, padding: 0, backgroundColor: "#EFEFEF" }}
                            data={this.state.listaCategs}
                            initValue={this.state.optTipoTxt}
                            onChange={(option) => { this.setState({ optTipo: option.key, optTipoTxt: option.label }) }}>

                            <TextInput
                                style={{ padding: 10, height: 45, color: '#000' }}
                                editable={false}
                                placeholder="Categoria do Livro"
                                value={this.state.optTipoTxt} />

                        </ModalPicker>
                    </View>

                    {this._showPrice()}

                </View>
            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ borderWidth: 1, borderColor: "#000", marginTop: 15 }}>
                        <Picker
                            style={est.picker}
                            selectedValue={this.state.optChoiceTxt}
                            onValueChange={(itemValue, itemIndex) => this.setState({ optChoice: itemIndex, optChoiceTxt: itemValue })}>
                            <Picker.Item label="Tipo de Anúncio" value="0" />
                            {
                                optBook.map((item) => {
                                    return (
                                        <Picker.Item key={item.key} label={item.label} value={item.label} />
                                    )
                                })
                            }
                        </Picker>
                    </View>

                    <View style={{ borderWidth: 1, borderColor: "#000", marginTop: 15 }}>
                        <Picker
                            style={est.picker}
                            selectedValue={this.state.optTipoTxt}
                            onValueChange={(itemValue, itemIndex) => this.setState({ optTipo: itemIndex, optTipoTxt: itemValue })}>
                            <Picker.Item label="Categoria do Livro" value="0" />
                            {
                                this.state.listaCategs.map((item) => {
                                    return (
                                        <Picker.Item key={item.key} label={item.label} value={item.label} />
                                    )
                                })
                            }
                        </Picker>
                    </View>

                    {this._showPrice()}

                </View>
            )
        }
    }

    _showPrice() {
        if (this.state.optChoice == 3) {
            return (
                <View style={{ marginTop: 15 }}>
                    <Sae
                        label={'Preço do Livro'}
                        iconClass={FontAwesomeIcon}
                        iconName={'pencil'}
                        iconColor={'black'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        inputStyle={{ color: '#000', fontSize: 15 }}
                        labelStyle={{ color: '#000', fontSize: 15 }}
                        value={this.state.preco}
                        onChangeText={(text) => this.setState({ preco: text })}
                    />
                </View>
            )
        }
    }

    _validaTela3() {
        if (this.state.optTipo == 0) {
            Alert.alert('Escolha uma categoria para o livro');
        } else if (this.state.optChoice == 0) {
            Alert.alert('Escolha o tipo de anúncio');
        } else {
            this.setState({ tela: 4 });
        }
    }

    _selectFotos() {
        ImagePicker.openPicker({
            multiple: true,
            width: 250,
            height: 650,
            includeBase64: true
        }).then(images => {
            if (images.length > 0) {
                let arr = [];
                for (let i = 0; i < images.length; i++) {
                    let d = images[i].data;
                    let item = { image: images[i].path, key: images[i].path + '--' + i, mime: images[i].mime, data: 'data:' + images[i].mime + ';base64,' + d };
                    arr.push(item);
                }
                let arr_atual = this.state.listaImagesGallery;
                let neu = arr_atual.concat(arr);
                this.setState({ listaImagesGallery: neu });
            }
        });
    }

    _keyExtractor = (item, index) => item.id;

    _showImagesGallery() {
        if (this.state.listaImagesGallery.length > 0) {
            return (
                <ScrollView style={{ paddingTop: 15}}>
                    <FlatList
                        style={{ flexDirection: 'row' }}
                        numColumns={3}
                        data={this.state.listaImagesGallery}
                        renderItem={
                            (item, index) => <View key={item.index} style={{ width: ((this.state.widthScreen - 40) / 3), alignItems: 'center', marginBottom: 10 }}><Image source={{ uri: item.item.image, width: 70, height: 110 }} style={{ width: 70, height: 110 }} /></View>
                        }
                    />
                </ScrollView>
            )
        } else {
            return (
                <View style={{ flex: 1, justifyContent:'center', alignItems:'center'}}>
                    <Text>Envie as imagens</Text>
                </View>
            )
        }
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
                    {/*<Sae
                        label={'Descrição do Livro'}
                        iconClass={FontAwesomeIcon}
                        iconName={'pencil'}
                        iconColor={'black'}
                        multiline={true}
                        numberOfLines={4}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        style={{ height: 'auto'}}
                        inputStyle={{ color: '#000', fontSize: 13, height:100 }}
                        labelStyle={{ color: '#000', fontSize: 13 }}
                        value={this.state.descricao}
                        onChangeText={(text) => this.setState({ descricao: text })}
                    />*/}
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
                        <Text style={est.Tit}>Envie fotos reais do livro</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableHighlight onPress={() => this._selectFotos()} style={{ backgroundColor:'#2B3845', paddingVertical:10, paddingHorizontal:30, borderRadius:4}} underlayColor="#2B3845">
                            <Text style={{ color:"#FFF" }}>Enviar Fotos</Text>
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

    salvaAnuncio() {
        //alert("ITEM SALVO");
        this.setState({ visible: true })
        let elementos = { id_user: this.userProfile.server_response.server_id, titulo: this.state.titulo, descricao: this.state.descricao, categoria: this.state.optTipo, tipo_anuncio: this.state.optChoice, miniatura: this.state.imageLivro, preco: this.state.preco };
        axios.post("http://liberapp.com.br/api/newAnuncio", elementos)
            .then(response => {
                if (response.data.status == 0) {
                    //salvar imagens no servidor
                    this.salvarImagensServer(response.data.id);
                } else {
                    Alert.alert("Não foram dados no post");
                }
            }).catch(err => {
                Alert.alert("Ops...", "Houve um erro ao salvar seu anúncio. Tente mais tarde.");
            });
    }

    checkUpload() {
        if (this.state.upImages == this.state.listaImagesGallery.length) {
            this.setState({ visible: false });
            setTimeout(() => {
                Alert.alert(
                    'Anúncio salvo',
                    'Seu anúncio foi criado e publicado com sucesso.',
                    [
                        { text: 'CONTINUAR', onPress: () => Actions.HomeScreen({ type: ActionConst.RESET }) },
                    ],
                    { cancelable: false }
                )
            }, 200);
        } else {
            let self = this;
            setTimeout(() => {
                self.checkUpload();
            }, 1000);
        }
    }

    salvarImagensServer(id_anuncio) {
        if (this.state.listaImagesGallery.length > 0) {
            for (let i = 0; i < this.state.listaImagesGallery.length; i++) {
                let obj = {
                    //let item = { image: images[i].path, key: images[i].path + '--' + i, data: 'data:' + images[i].mime + ';base64,' + d };
                    name: 'file',
                    filename: 'image-' + id_anuncio + '-' + i + '.jpg',
                    filepath: this.state.listaImagesGallery[i].data,
                    filetype: this.state.listaImagesGallery[i].mime,
                    id: id_anuncio
                }
                axios.post("http://liberapp.com.br/api/saveImageGaleria", obj)
                    .then(resp => {
                        let val = this.state.upImages + 1;
                        this.setState({ upImages: val });
                        console.log("sucess:", resp.data);
                    }).catch(err => {
                        let val = this.state.upImages + 1;
                        this.setState({ upImages: val });
                        console.log(err)
                    })
            }
            this.checkUpload();
        } else {
            Alert.alert(
                'Anúncio salvo',
                'Seu anúncio foi criado e publicado com sucesso.',
                [
                    { text: 'CONTINUAR', onPress: () => Actions.HomeScreen({ type: ActionConst.RESET }) },
                ],
                { cancelable: false }
            )
        }
    }

    render() {
        return (
            <View style={[est.boxGeral]} >
                <View style={est.ToolBar}>
                    <TouchableHighlight onPress={() => { Actions.pop() }} underlayColor="#FFF" style={{ flex: .7, paddingLeft:15 }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Icon name="md-arrow-round-back" size={20} color="#2B3845" />
                        </View>
                    </TouchableHighlight>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={{ fontSize: (Platform.OS == 'ios') ? 15 : 17, color: '#2B3845', fontWeight: 'bold' }}>Criar Anúncio</Text>
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
    ToolBar: { paddingTop: (Platform.OS === 'ios') ? 20 : 0, height: 50, flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#FFF" },
    content: { backgroundColor: '#eee', flex: 1 },
    btnCancel: { position: 'absolute', bottom: 7, left: 7, paddingVertical: 9, paddingHorizontal: 15, backgroundColor: '#f00', borderRadius: 50 },
    btnConfirm: { position: 'absolute', bottom: 7, right: 7, paddingVertical: 9, paddingHorizontal: 15, backgroundColor: '#00cc00', borderRadius: 50 },
    Tit: { fontSize: (Platform.OS === 'ios') ? 14 : 16, fontFamily: font },
    image: { width: 74, height: 114, backgroundColor: '#000', borderWidth: 2 },
    borderNotActive: {
        borderColor: '#eee',
        borderWidth:1,
        transform: [{ scale: 1 }],
        position: 'relative',
        zIndex: 10,
        opacity:0.6
    },
    picker: {
        backgroundColor: "#EFEFEF",
        height: 50,
        padding: 0,
        margin: 0

    },
    borderActive: { borderColor: '#f00', borderWidth:1, position: 'relative', transform: (Platform.OS == 'ios') ? [{ scale: 1.2 }]: [{scale: 1}], zIndex: 99, opacity:1 }
});

const mapStateToProps = state => ({
    profile: state.AppReducer.profile
});
export default connect(mapStateToProps, {})(Anunciar);