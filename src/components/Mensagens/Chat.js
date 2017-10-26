import React, { Component } from 'react';
import { View, Text, Image, Keyboard, TouchableHighlight, TextInput, Platform, StyleSheet, Alert, FlatList } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { connect } from 'react-redux';

import MensagemChat from './MensagemChat';
import Loading from '../Outros/Loading';
import ErrorNetwork from '../Outros/ErrorNetwork';

const nome = '';
const userProfile = [];
class Chat extends Component {
    constructor(props) {
        super(props);
        let nom = this.props.item.usuario.split(" ");
        let explode = nom[0];
        nome = explode;
        this.userProfile = JSON.parse(this.props.profile);

        this.state = { loadData: false, data: [], errorNetwork: false, errorNumber: 0, text: '', padBottom:0, flexBottom: 1 };

        this.reloadFuncaoChat = this.reloadFuncaoChat.bind(this);

        this._loadMsgs();
    }

    componentWillMount() {
        let self = this;
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
            this.setState({ flexBottom: 2, padBottom: (e.endCoordinates.height +20) });
            setTimeout(function () {
                self.scroolFinal();
            }, 190);
        });
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            this.setState({ flexBottom: 1, padBottom:0 });
        });
    }

    componentDidMount(){
        let self = this;
        this.intervalId = setInterval( () => {
            self.checkNewMessages();
        },3000);
    }

    checkNewMessages(){
        let self = this;
        axios.post('http://liberapp.com.br/api/msgs_chat', { user_id: this.userProfile.server_response.server_id, id_livro: (this.props.item.id) })
            .then((response) => {
                //remove o load e insere os dados no state
                //alert(JSON.stringify(response));
                if (response.data.status == 0 || response.data.status == "0") {
                    this.setState({ loadData: true, data: response.data.msgs });
                    if (this.state.loadData && this.state.data.length > 6) {
                        this.timeoutt2 = setTimeout(function () {
                            self.scroolFinal();
                        }, 190);
                    }
                } else if (response.data.status == 1 || response.data.status == "1") {
                    this.setState({ loadData: true });
                } else {
                    this.setState({ loadData: true });
                    /*Alert.alert(
                        'Ops...',
                        'Houve um erro, ao recuperar suas mensagens. Tente novamente mais tarde.'
                    );*/
                }
            }).catch((data) => {
                if (data == 'Error: Network Error') {
                    this.setState({ loadData: true, errorNetwork: true, errorNumber: 2 });
                    Alert.alert("Você está sem conexão com a internet.");
                } else {
                    this.setState({ loadData: true, errorNetwork: true, errorNumber: 0 });
                    Alert.alert(
                        'Ops...',
                        'Houve um erro, ao recuperar suas mensagens. Tente novamente mais tarde.'
                    );
                }
            });
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        clearInterval(this.intervalId);
        clearTimeout(this.timeoutt);
        clearTimeout(this.timeoutt2);
    }

    reloadFuncaoChat() {
        this.setState({ loadData: true, errorNetWork: false, errorNumber: 0 });
        this._loadItemsVenda();
    }

    _backHistory() {
        Actions.pop();
    }

    scroolFinal() {
        this.flatList.scrollToEnd();
    }

    _loadMsgs() {
        let self = this;
        axios.post('http://liberapp.com.br/api/msgs_chat', { user_id: this.userProfile.server_response.server_id, id_livro: (this.props.item.id) })
            .then((response) => {
                //remove o load e insere os dados no state
                //alert(JSON.stringify(response));
                if (response.data.status == 0 || response.data.status == "0") {
                    this.setState({ loadData: true, data: response.data.msgs });
                    if (this.state.loadData && this.state.data.length > 6) {
                        this.timeoutt = setTimeout(function () {
                            self.scroolFinal();
                        }, 190);
                    }
                } else if (response.data.status == 1 || response.data.status == "1") {
                    this.setState({ loadData: true });
                } else {
                    this.setState({ loadData: true });
                    /*Alert.alert(
                        'Ops...',
                        'Houve um erro, ao recuperar suas mensagens. Tente novamente mais tarde.'
                    );*/
                }
            }).catch((data) => {
                if (data == 'Error: Network Error') {
                    this.setState({ loadData: true, errorNetwork: true, errorNumber: 2 });
                    Alert.alert("Você está sem conexão com a internet.");
                } else {
                    this.setState({ loadData: true, errorNetwork: true, errorNumber: 0 });
                    Alert.alert(
                        'Ops...',
                        'Houve um erro, ao recuperar suas mensagens. Tente novamente mais tarde.'
                    );
                }
            });
    }

    sendMessage() {
        if (this.state.text != '') {
            let tct = this.state.text;
            this.setState({ text: '' });
            axios.post('http://liberapp.com.br/api/new_msg_chat', { user_id: this.userProfile.server_response.server_id, msg: tct, livro_id: this.props.item.id, situacao: this.props.item.chat_status })
                .then((response) => {
                    if (response.data.status == 0 || response.data.status == "0") {
                        this.setState({ text: '' });
                        this._loadMsgs();
                    } else {
                        this.setState({ text: '' });
                        Alert.alert(
                            'Ops...',
                            'Houve um erro, ao recuperar suas mensagens. Tente novamente mais tarde.'
                        );
                    }
                }).catch((data) => {
                    if (data == 'Error: Network Error') {
                        this.setState({ text: '' });
                        Alert.alert("Você está sem conexão com a internet.");
                    } else {
                        this.setState({ text: '' });
                        Alert.alert(
                            'Ops...',
                            'Houve um erro, ao recuperar suas mensagens. Tente novamente mais tarde.'
                        );
                    }
                });
        }
    }

    _loadTelaMsgs() {
        if (this.state.loadData) {
            if (!this.state.errorNetwork) {
                return (
                    <View style={{ flex: 1, paddingBottom: (Platform.OS == 'ios') ? this.state.padBottom:0 }}>
                        <View style={{ flex: 10, paddingTop: 10 }}>
                            <FlatList
                                ref={(ref) => this.flatList = ref}
                                data={this.state.data}
                                renderItem={
                                    (item) => <MensagemChat key={item.id} id={item.id} {...item} profile={this.props.profile} />
                                }
                            />
                        </View>
                        <View style={{ flex: (Platform.OS == 'ios') ? .89 : this.state.flexBottom, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 6 }}>
                                <TextInput
                                    style={{ height: 40, paddingHorizontal: 15, fontSize: (Platform.OS == 'ios') ? 12 : 14, borderColor: '#FFF', borderWidth: 1 }}
                                    onChangeText={(text) => this.setState({ text })}
                                    value={this.state.text}
                                    returnKeyType={'done'}
                                    returnKeyLabel="Enviar"
                                    underlineColorAndroid="transparent"
                                    onSubmitEditing={(e) => this.sendMessage()}
                                    placeholder="Digite sua mensagem aqui"
                                />
                            </View>
                        </View>
                    </View>
                );
            } else {
                return (
                    <ErrorNetwork error={{ erro: this.state.errorNumber }} reloadFuncao={this.reloadFuncaoChat} />
                );
            }
        } else {
            return (
                <Loading />
            );
        }
    }

    render() {
        return (
            <View style={est.boxGeral}>
                <View style={est.ToolBar}>
                    <View style={{ flex: .3 }}>
                        <TouchableHighlight onPress={() => { this._backHistory() }} underlayColor="#FFF">
                            <Icon name="md-arrow-round-back" size={20} color="#2B3845" />
                        </TouchableHighlight>
                    </View>
                    <View style={{ flex: 1, alignItems: "center", overflow: 'hidden' }}>
                        <Text style={{ fontSize: (Platform.OS == 'ios') ? 15 : 17, color: '#2B3845', fontWeight: 'bold' }}>Chat com {nome}</Text>
                    </View>
                    <View style={{ flex: .3, alignItems: "flex-end" }}>
                    </View>
                </View>
                <View style={est.content}>
                    {this._loadTelaMsgs()}
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
    boxGeral: { flex: 1 },
    ToolBar: { paddingTop: (Platform.OS === 'ios') ? 20 : 0, height: 50, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, backgroundColor: "#FFF" },
    content: { backgroundColor: '#eee', flex: 1 },
    imgUser: { margin: -7, borderRadius: (Platform.OS == 'ios') ? 0 : 100, borderWidth: (Platform.OS == 'ios') ? 0 : 7, borderColor: "rgba(0,0,0,0.5)" },
    boxTopo: { paddingVertical: 25, alignItems: "center" }
});

const mapStateToProps = state => ({
    profile: state.AppReducer.profile
});
export default connect(mapStateToProps, {})(Chat);