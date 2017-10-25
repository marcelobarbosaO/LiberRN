import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Platform, Image, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import axios from 'axios';

import EditarPerfil from './EditarPerfil';
import Loading from '../Outros/Loading';
import ErrorNetwork from '../Outros/ErrorNetwork';

const userProfile = [];
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = { loadData: false, dataProfile: [], errorNetwork: false, visible: false };
        this.userProfile = JSON.parse(this.props.profile);
        this.hideModal = this.hideModal.bind(this);
    }

    static contextTypes = { drawer: React.PropTypes.object }

    _openMenu() {
        this.context.drawer.open();
    }

    componentWillMount() {
        this._loadProfile();
    }

    reloadProfile(){
        this.setState({ loadData: false, errorNetwork: false });
        this._loadProfile();
    }

    _loadProfile() {
        axios.post('http://liberapp.com.br/api/dados_profile', { id: this.userProfile.server_response.server_id })
            .then((response) => {
                //remove o load e insere os dados no state
                if (response.data.status == 0 || response.data.status == "0") {
                    this.setState({ loadData: true, dataProfile: response.data });
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
                        'Houve um erro, ao recuperar seus dados. Tente novamente mais tarde.'
                    );
                }
            });
    }

    _loadBottomComponent() {
        if (this.state.loadData) {
            if (!this.state.errorNetwork) {
                return (
                    <View style={est.boxBottom}>
                        <TouchableHighlight onPress={() => Actions.MeusAnunciosScreen({ type: ActionConst.RESET })} style={est.btn} underlayColor="transparent">
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", position: 'relative' }}>
                                <Image source={require('../../imgs/icones/meus_anuncios.png')} style={est.imgIcon} />
                                <Text style={est.itemText}>Meus Anúncios</Text>
                                <View style={est.boxNumber}>
                                    <Text style={est.number}>{this.state.dataProfile.qtd_anuncios}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => Actions.MensagensScreen({ type: ActionConst.RESET })} style={est.btn} underlayColor="transparent">
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", position: 'relative' }}>
                                <Image source={require('../../imgs/icones/mensagens.png')} style={est.imgIcon} />
                                <Text style={est.itemText}>Mensagens</Text>
                                <View style={est.boxNumber}>
                                    <Text style={est.number}>{this.state.dataProfile.qtd_chat}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => Actions.ListaDesejoScreen({ type: ActionConst.RESET })} style={est.btn} underlayColor="transparent">
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", position: 'relative' }}>
                                <Image source={require('../../imgs/icones/lista_desejo.png')} style={est.imgIcon} />
                                <Text style={est.itemText}>Livros Desejados</Text>
                                <View style={est.boxNumber}>
                                    <Text style={est.number}>{this.state.dataProfile.qtd_desejo}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => false } style={est.btn} underlayColor="transparent">
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", position: 'relative' }}>
                                <Image source={require('../../imgs/icones/views.png')} style={est.imgIcon} />
                                <Text style={est.itemText}>Visualizações</Text>
                                <View style={est.boxNumber}>
                                    <Text style={est.number}>{this.state.dataProfile.qtd_views}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>
                )
            } else {
                return (
                    <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                        <Text>Houve um erro de conexão com a internet.</Text>
                        <TouchableHighlight onPress={() => this.reloadProfile() } style={{ backgroundColor: '#2B3845', paddingHorizontal: 25, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: '#2B3845' }}>
                            <Text style={{ color: '#FFF' }}>Tente Novamente</Text>
                        </TouchableHighlight>
                    </View>
                )
            }
        } else {
            return (
                <Loading />
            );
        }
    }

    hideModal(){
        this.setState({ visible: false });
    }

    render() {
        return (
            <View style={est.boxGeral}>
                <View style={est.ToolBar}>
                    <TouchableHighlight onPress={() => { this._openMenu() }} underlayColor="#FFF" style={{ flex: 1 }}>
                        <View style={{ flex: 1, justifyContent:'center' }}>
                            <Icon name="md-menu" size={20} color="#2B3845" />
                        </View>
                    </TouchableHighlight>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={{ fontSize: (Platform.OS == 'ios') ? 15 : 17, color: '#2B3845', fontWeight: 'bold' }}>Perfil</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                    </View>
                </View>

                <View style={est.content}>
                    <Image source={require('../../imgs/bg_profile.jpg')} style={{ width: null, height: null, resizeMode: 'stretch' }}>
                        <View style={est.boxTopo}>
                            <View style={{ width: 150, height: 150, borderRadius: 100, borderWidth: 7, borderColor: "rgba(0,0,0,0.5)", overflow: 'hidden', padding: 0, margin: 0 }}>
                                <Image source={{ uri: this.userProfile.server_response.server_foto, width: 150, height: 150 }} style={est.imgUser} />
                            </View>
                            <View style={{ flexDirection:'row', alignItems:'center', marginTop:10 }}>
                                <Icon name="ios-contact" color="#FFF" size={24} style={{ backgroundColor:'transparent', marginRight: 20, height:24 }} />
                                <Text style={est.nomeUser}>{ this.userProfile.nome }</Text>
                            </View>
                            <View style={{ flexDirection:'row', alignItems:'center', marginTop:10 }}>
                                <Icon name="ios-home" color="#FFF" size={24} style={{ backgroundColor:'transparent', marginRight: 20, height:24 }}/>
                                <Text style={ est.nomeCidade }>{ (this.userProfile.server_response.server_cidade != "null") ? this.userProfile.server_response.server_cidade:'cadastrar cidade'}</Text>
                            </View>
                            <TouchableHighlight onPress={ () => this.setState({ visible:true }) } style={{ position:'absolute', bottom: 5, right:5, backgroundColor:'#FFF', paddingVertical: 5, paddingHorizontal:9, borderRadius: 100}} underlayColor="transparent">
                                <Icon style={{ backgroundColor:'transparent'}} name="md-create" size={25} color="#424B54"/>
                            </TouchableHighlight>
                        </View>
                    </Image>
                    {this._loadBottomComponent()}
                </View>
                <Modal visible={ this.state.visible } transparent={true} onRequestClose={() => false} animationType="slide">
                        <View style={{ flex: 1}}>
                            <EditarPerfil hideModal={ this.hideModal }/>
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
    boxGeral: { flex: 1 },
    ToolBar: { paddingTop: (Platform.OS === 'ios') ? 20 : 0, height: 50, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, backgroundColor: "#FFF" },
    content: { backgroundColor: '#eee', flex: 1 },
    imgUser: { margin: -7, borderRadius: (Platform.OS == 'ios') ? 0 : 100, borderWidth: (Platform.OS == 'ios') ? 0 : 7, borderColor: "rgba(0,0,0,0.5)" },
    boxTopo: { paddingVertical: 25, alignItems: "center" },
    nomeUser: { backgroundColor: 'transparent', color: '#FFF', fontSize: (Platform.OS === 'ios') ? 16 : 19, fontFamily: 'OpenSans-ExtraBold' },
    nomeCidade: { backgroundColor: 'transparent', color: '#FFF', fontSize: (Platform.OS === 'ios') ? 14 : 16, fontFamily: font },
    boxBottom: { marginVertical: 15, paddingHorizontal: 40, flex: 1, justifyContent: 'space-around' },
    imgIcon: { height: 35, width: 35, resizeMode: "center", marginRight: 20 },
    btn: { flex: 1 },
    itemText: {
        fontSize: 17,
        color: '#424B54',
        fontFamily: font
    },
    boxNumber: { position: 'absolute', bottom: 17, right: 0, paddingVertical: 5, paddingHorizontal: 7, backgroundColor: '#D8D8D8', borderRadius: 50, borderWidth: 1, borderColor: '#979797' },
    number: { backgroundColor: 'transparent', textAlign: 'center', color: '#424B54', fontFamily: font, fontSize: (Platform.OS === 'ios') ? 12 : 14 }
});

const mapStateToProps = state => ({
    profile: state.AppReducer.profile
});
export default connect(mapStateToProps, {})(Index);