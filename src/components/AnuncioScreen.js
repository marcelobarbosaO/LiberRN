import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Platform, TouchableHighlight, Image, Alert, Dimensions, Modal } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';
import axios from 'axios';
import Imagee from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import Modall from 'react-native-modal'
import { connect } from 'react-redux';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

var radio_props = [
    { label: 'Não é um anúncio de livro', value:0 },
    { label: 'Está me incomodando', value: 1 },
    { label: 'Infrigi direitos autorais', value: 2 }
];

const userProfile = [];
class AnuncioScreen extends Component {
    constructor(props) {
        super(props);
        this.userProfile = JSON.parse(this.props.profile);
        this.state = { aba: 1, listaImgs: [], width: 0, height: 0, visible: false, images: [], visibleModal: false, valor_denuncia:'' };
        this._loadImagesBook();

    }

    componentDidMount() {
        this.setState({ width: Dimensions.get('window').width, height: Dimensions.get('window').height });
        this._moreView();
    }
    
    _moreView(){
        axios.post('http://liberapp.com.br/api/more_view_book',{ id: this.props.item.id})
        .then( (response) => {

        }).catch( (error) => {

        })
    }

    _backHistory() {
        Actions.pop();
    }

    _loadImagesBook() {
        axios.post('http://liberapp.com.br/api/imagens_livro', { id: this.props.item.id })
            .then((response) => {
                //alert(JSON.stringify(response));
                if (response.data.status == 0 || response.data.status == "0") {
                    this.setState({ listaImgs: response.data.lista });
                } else {

                }
            }).catch((data) => {
                if (data == 'Error: Network Error') {
                    //this.setState({ loadData: true, errorNetwork: true });
                    Alert.alert("Você está sem conexão com a internet.");
                } else {
                    alert(data);
                    //this.setState({ loadData: true, errorNetwork: true });
                    Alert.alert(
                        'Ops...',
                        'Houve um erro, ao recuperar seus dados. Tente novamente mais tarde.'
                    );
                }
            });
    }

    _loadImageUser() {
        if (this.props.item.user_foto == '') {
            return (
                <View style={{ width: 30, height: 30, borderRadius: 40, padding: 0, margin: 0, overflow: 'hidden', borderWidth: 3, borderColor: "rgba(0,0,0,0.1)" }}>
                    <Imagee source={require('../imgs/user_default.png')} style={{ margin: -3, width: 30, height: 30, borderWidth: (Platform.OS == 'ios') ? 0 : 2, borderRadius: (Platform.OS == 'ios') ? 0 : 40, borderColor: "rgba(0,0,0,0.1)", position:'relative' }} />
                </View>
            );
        } else {
            return (
                <View style={{ width: 30, height: 30, borderRadius: 40, padding: 0, margin: 0, overflow: 'hidden', borderWidth: 3, borderColor: "rgba(0,0,0,0.1)", position:'relative' }}>
                    <Image source={{ uri: this.props.item.user_foto, width:30, height:30 }} style={{ margin: -3, borderWidth: (Platform.OS == 'ios') ? 0 : 2, borderRadius: (Platform.OS == 'ios') ? 0 : 40, borderColor: "rgba(0,0,0,0.1)", position:'relative' }} />
                </View>
            );
        }
    }

    _loadBottomComponent() {
        if (this.state.aba == 1) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ScrollView>
                        <Text style={est.txtDet}>{this.props.item.descricao}</Text>
                    </ScrollView>
                </View>
            )
        } else {
            if (this.state.listaImgs.length > 0) {
                return (
                    <ScrollView>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {
                                this.state.listaImgs.map((item) => {
                                    return (
                                        <View style={{ width: (this.state.width / 3), marginTop: 10, alignItems: 'center' }} key={item.id}>
                                            <TouchableHighlight onPress={() => this._loadImageView(item.url)}>
                                                <Imagee indicator={Progress.Circle} indicatorProps={{ showsText: true }} source={{ uri: item.url, width: 70, height: 110 }} style={{ width: 70, height: 110, backgroundColor: '#eee' }} />
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
                        <Text style={est.txtDet}>Nenhuma Imagem Cadastrada</Text>
                    </View>
                )
            }
        }
    }

    _loadImageView(url) {
        this.setState({ visible: true, images: [{ url: url }] })
    }

    _enviarDenuncia(){
        let denuncia = '';
        switch(this.state.valor_denuncia){
            case 0:
                denuncia = 'Não é um anúncio de livro';
                break;
            case 1:
                denuncia = 'Está me incomodando';
                break;
            case 2:
                denuncia = 'Infrigi direitos autorais';
                break;
        }
        this.setState({ visibleModal: false });
        axios.post('http://liberapp.com.br/api/denunciar', { livro_id: this.props.item.id, user_id: this.userProfile.server_response.server_id, denuncia_id: denuncia })
            .then((response) => {
                //alert(JSON.stringify(response));
                if (response.data.status == 0 || response.data.status == "0") {
                    Alert.alert('Denuncia Realizada', "Sua denúncia foi feita com sucesso. Aguarde nossa supervisão.");
                } else {
                    Alert.alert('Ops...', "Você já denunciou essa publicação");
                }
            }).catch((data) => {
                if (data == 'Error: Network Error') {
                    //this.setState({ loadData: true, errorNetwork: true });
                    Alert.alert("Você está sem conexão com a internet.");
                } else {
                    alert(data);
                    //this.setState({ loadData: true, errorNetwork: true });
                    Alert.alert(
                        'Ops...',
                        'Houve um erro, ao recuperar seus dados. Tente novamente mais tarde.'
                    );
                }
            });
    }

    render() {
        return (
            <View style={est.boxGeral}>
                <Modall style={est.modalContent} isVisible={this.state.visibleModal} animationIn={'slideInUp'} animationOut={'slideOutDown'}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 2, backgroundColor: 'white', borderRadius: 4, borderColor: 'rgba(0, 0, 0, 0.1)' }}>
                        <View style={{ flex: 1, alignItems: 'center', padding: 10, justifyContent: 'center', borderBottomWidth: 1, borderColor: '#000' }}>
                            <Text>Qual o motivo da denúncia?</Text>
                        </View>
                        <View style={{ flex: 3, padding: 10 }}>
                            <RadioForm
                                radio_props={radio_props}
                                initial={0}
                                buttonColor={'#2D3B49'}
                                animation={true}
                                labelColor={'#2D3B49'}
                                onPress={(value) => { this.setState({ valor_denuncia: value }) }}
                            />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', padding: 10, borderTopWidth: 1, borderColor: 'rgba(0,0,0,1)' }}>
                            <TouchableHighlight style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#000', marginRight: 7 }} onPress={() => this.setState({ visibleModal: false })} underlayColor="transparent">
                                <Text>Cancelar</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => this._enviarDenuncia() } style={{ flex: 1, backgroundColor: '#2D3B49', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#000', position: 'relative' }} underlayColor="transparent">
                                <Text style={{ color: '#FFF' }}>Enviar</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </Modall>
                <Modal visible={this.state.visible} transparent={true} onRequestClose={() => false}>
                    <View style={{ flex: .1, backgroundColor: 'rgba(0,0,0,1)', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <TouchableHighlight underlayColor="transparent" onPress={() => this.setState({ visible: false, images: [] })}>
                            <Text style={{ color: '#FFF', paddingBottom: 7 }}>Fechar</Text>
                        </TouchableHighlight>
                    </View>
                    <ImageViewer imageUrls={this.state.images} />
                </Modal>
                <View style={est.ToolBar}>
                    <TouchableHighlight onPress={() => { this._backHistory() }} underlayColor="#FFF" style={{ flex: .3, paddingLeft:15 }}>
                        <View style={{ flex: 1, justifyContent:'center' }}>
                            <Icon name="md-arrow-round-back" size={20} color="#2B3845" />
                        </View>
                    </TouchableHighlight>
                    <View style={{ flex: 1, alignItems: "center", overflow: 'hidden' }}>

                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end", justifyContent: 'flex-end', paddingRight:15 }}>
                        <TouchableHighlight onPress={() => this.setState({ visibleModal: true })} underlayColor="transparent" style={{ paddingVertical: 0, paddingHorizontal: 0, backgroundColor: '#FFF', borderRadius: 100, borderWidth: 2, borderColor: '#2D3948', marginBottom: 3 }}>
                            <Image source={require('../imgs/icones/anunciar_dark.png')} style={{ width: 25, height: 25 }} />
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={est.content}>

                    <View style={est.boxTopo}>
                        <Image source={require('../imgs/bg_anuncio.jpg')} style={{ flex: 1, resizeMode: 'stretch', width: null }}>
                            <View style={{ flex: 1, padding: 20, flexDirection: 'row', alignItems: 'center' }}>
                                <Imagee indicator={Progress.Circle} indicatorProps={{ showsText: true }} source={{ uri: this.props.item.foto, width: 90, height: 130, }} style={{ width: 90, height: 130 }} />
                                <View style={{ paddingLeft: 15, flexGrow: 1, width:0 }}>
                                    <Text style={[est.trans, { color: '#FFF', fontSize: 16, marginBottom: 15, fontWeight: 'bold' }]}>{this.props.item.titulo}</Text>
                                    <Text style={[est.trans, { color: '#FFF', fontSize: 13, paddingBottom: 30 }]}>Postado: {this.props.item.data}</Text>
                                </View>
                            </View>
                            <View style={{ position: 'absolute', bottom: 5, right: 5, alignItems: 'flex-end' }}>
                                {this._loadImageUser()}
                                <Text style={[est.trans, { fontSize: 15, color: '#fff' }]}>{this.props.item.usuario}</Text>
                            </View>
                        </Image>
                    </View>
                    <View style={est.boxMeio}>
                        <TouchableHighlight onPress={() => this.setState({ aba: 1 })} style={[est.opcao, (this.state.aba == 1) ? est.abaAtiva : est.abaNormal]} underlayColor="transparent">
                            <Text style={est.textOpcao}>Detalhes</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.setState({ aba: 2 })} style={[est.opcao, (this.state.aba == 2) ? est.abaAtiva : est.abaNormal]} underlayColor="transparent">
                            <Text style={est.textOpcao}>Imagens</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={est.boxBottom}>
                        {this._loadBottomComponent()}
                        <TouchableHighlight onPress={() => Actions.ChatScreen({ item: this.props.item })} underlayColor="transparent" style={{ paddingVertical: 12, paddingHorizontal: 12, backgroundColor: '#2D3B49', borderRadius: 100, position: 'absolute', bottom: 5, right: 5 }}>
                            <Image source={require('../imgs/icones/mensagens_white.png')} style={{ width: 25, height: 25 }} />
                        </TouchableHighlight>
                    </View>
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
    boxGeral: {
        flex: 1,
    },
    ToolBar: { paddingTop: (Platform.OS === 'ios') ? 20 : 0, height: 50, flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#FFF" },
    content: { backgroundColor: '#eee', flex: 1 },
    imgUser: { margin: -7, borderRadius: (Platform.OS == 'ios') ? 0 : 100, borderWidth: (Platform.OS == 'ios') ? 0 : 7, borderColor: "rgba(0,0,0,0.5)" },
    boxTopo: { flex: .8, backgroundColor: '#FFF' },
    trans: { backgroundColor: 'transparent', fontFamily: font },
    boxMeio: { flex: .15, backgroundColor: '#fff', flexDirection: 'row' },
    opcao: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    textOpcao: { color: '#93A8AC', fontSize: 14, fontFamily: font },
    abaAtiva: { borderBottomWidth: 2, borderColor: '#40476A' },
    abaNormal: { borderBottomWidth: 2, borderColor: '#FFF' },
    boxBottom: { flex: 1, backgroundColor: '#fff' },
    txtDet: { color: '#2D3B49', fontSize: 14, fontFamily: font },
    modalContent: {
        padding: 22,
        justifyContent: 'center'
    },
});

const mapStateToProps = state => ({
    profile: state.AppReducer.profile
});
export default connect(mapStateToProps, {})(AnuncioScreen);