import React, { Component } from 'react';
import { ScrollView, View, Text, Image, Platform, TouchableHighlight, Picker, StyleSheet, TextInput, Alert, Modal } from 'react-native';
import ModalPicker from 'react-native-modal-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import CPF_VALIDATOR from 'cpf_cnpj';
import axios from 'axios';

import { URL_API } from '../../types';
import Loading from '../Outros/Loading';

class EditarPerfil extends Component {
    constructor(props) {
        super(props);
        this.userProfile = JSON.parse(this.props.profile);
        this.state = { botaoPress: '', nome: '', email: '', cpf: '', cidade_id: null, estado_id: null, cidade: '', estado: '', telefone: '', niver: '', loadProfile: false, visible: false, lista_estados: [], lista_cidades: [] };
    }

    componentDidMount() {
        axios.post(URL_API + 'my_profile', { id: this.userProfile.server_response.server_id })
            .then(data => {
                if (data.data.status == 0) {
                    let obj = data.data.profile;
                    this.setState({
                        loadProfile: true,
                        nome: obj.nome,
                        email: obj.email,
                        telefone: obj.telefone,
                        niver: obj.niver,
                        cpf: obj.cpf,
                        cidade: obj.cidade,
                        cidade_id: obj.cidade_id,
                        estado_id: obj.estado_id,
                        estado: obj.estado
                    })
                    if (obj.estado_id != '') {
                        this.loadCidades(obj.estado_id);
                    }
                } else {
                    this.setState({ loadProfile: true });
                }
            }).catch(err => {
                this.setState({ loadProfile: true });
                Alert.alert("err");
            });

        axios.get(URL_API + "lista_estados")
            .then(resp => {
                //alert(JSON.stringify(resp.data.estados))
                this.setState({ lista_estados: resp.data.estados })
            });
    }

    makeCpf(cpf, tipo) {
        if (tipo == 1) {
            let val = cpf;
            if (cpf.length == 3) {
                if (this.state.botaoPress == 'Backspace')
                    val = cpf;
                else
                    val = cpf + '.';
            }
            if (cpf.length == 7) {
                if (this.state.botaoPress == 'Backspace')
                    val = cpf;
                else
                    val = cpf + '.';
            }
            if (cpf.length == 11) {
                if (this.state.botaoPress == 'Backspace')
                    val = cpf;
                else
                    val = cpf + '-';
            }
            this.setState({ cpf: val });
        } else {
            var n = cpf.match(/\d/g);
            var cont = Object.keys(n).length;
            let val = n[0] + n[1] + n[2] + '.' + n[3] + n[4] + n[5] + '.' + n[6] + n[7] + n[8] + '-' + n[9] + n[10];
            this.setState({ cpf: val });
        }
    }

    makeCel(cel, tipo) {
        if (tipo == 1) {
            let val = cel;
            var n = cel.match(/\d/g);
            if (n != null) {
                var cont = Object.keys(n).length;
                if (cont == 1) {
                    if (this.state.botaoPress == 'Backspace')
                        val = cel;
                    else
                        val = '(' + n[0];
                }
                if (cont == 2) {
                    if (this.state.botaoPress == 'Backspace')
                        val = '(' + n[0];
                    else
                        val = '(' + n[0] + n[1];
                }
                if (cont == 3) {
                    if (this.state.botaoPress == 'Backspace')
                        val = cel
                    else
                        val = '(' + n[0] + n[1] + ') ' + n[2];
                }

                if (cont == 8) {
                    if (this.state.botaoPress == 'Backspace')
                        val = cel
                    else
                        val = '(' + n[0] + n[1] + ') ' + n[2] + n[3] + n[4] + n[5] + n[6] + '-' + n[7];
                }

                if (cont == 7) {
                    if (this.state.botaoPress == 'Backspace')
                        val = '(' + n[0] + n[1] + ') ' + n[2] + n[3] + n[4] + n[5] + n[6];
                }

                if (cont == 8) {
                    if (this.state.botaoPress == 'Backspace')
                        val = cel
                    else
                        val = '(' + n[0] + n[1] + ') ' + n[2] + n[3] + n[4] + n[5] + n[6] + '-' + n[7];
                }
                this.setState({ telefone: val });
            } else {
                this.setState({ telefone: '' });
            }
        } else {
            var n = cel.match(/\d/g);
            var cont = Object.keys(n).length;
            let val = '(' + n[0] + n[1] + ') ' + n[2] + n[3] + n[4] + n[5] + n[6] + '-' + n[7] + n[8] + n[9] + n[10];
            this.setState({ telefone: val });
        }
    }

    makeNiver(dat, tipo) {
        if (tipo == 1) {
            let val = dat;
            var n = dat.match(/\d/g);
            if (n != null) {
                var cont = Object.keys(n).length;
                if (cont == 3) {
                    if (this.state.botaoPress == 'Backspace')
                        val = val;
                    else
                        val = n[0] + n[1] + '/' + n[2];
                }

                if (cont == 5) {
                    if (this.state.botaoPress == 'Backspace')
                        val = val;
                    else
                        val = n[0] + n[1] + '/' + n[2] + n[3] + '/' + n[4];
                }

            } else {
                val = '';
            }
            this.setState({ niver: val });
        } else {
            let date = dat + 'T00:00:00-06:00';
            let n = new Date(date);
            let dia = 0;
            let mes = 0;
            if (n.getDate() > 9) {
                dia = n.getDate();
            } else {
                dia = "0" + n.getDate();
            }
            if (n.getMonth() > 8) {
                mes = (parseInt(n.getMonth()) + 1);
            } else {
                mes = "0" + (parseInt(n.getMonth()) + 1);
            }
            let niver = dia + '/' + mes + '/' + n.getFullYear();
            this.setState({ niver: niver });
        }
    }

    botaoPress(e) {
        this.setState({ botaoPress: e.nativeEvent.key });
    }

    checkData() {
        if (this.state.cpf != '' && this.state.cpf != null) {
            if (CPF_VALIDATOR.CPF.isValid(this.state.cpf)) {
                this.updateProfile();
            } else {
                Alert.alert("CPF Inválido");
            }
        } else {
            this.updateProfile();
        }
    }

    updateProfile() {
        this.setState({ visible: true });
        let obj = { id: this.userProfile.server_response.server_id, nome: this.state.nome, email: this.state.email, telefone: this.state.telefone, niver: this.state.niver, cpf: this.state.cpf, cidade_id: this.state.cidade_id };
        axios.post(URL_API + 'update_profile_2', obj)
            .then(resp => {
                this.setState({ visible: false });
                if (resp.data.status == 0) {
                    setTimeout(() => {
                        Alert.alert("Perfil atualizado com sucesso.");
                    }, 200);
                } else if (resp.data.status == 1) {
                    setTimeout(() => {
                        Alert.alert("Esse usuário não existe mais");
                    }, 200);
                } else {
                    setTimeout(() => {
                        //alert(JSON.stringify(resp))
                        Alert.alert("Não foram dados no post");
                    }, 200);
                }
            }).catch(err => {
                this.setState({ visible: false });
                setTimeout(() => {
                    //alert(JSON.stringify(err));
                    Alert.alert("Houve um erro de comunicação com o servidor.");
                }, 200);
            });
    }

    _load_profile() {
        if (this.state.loadProfile) {
            return (
                <ScrollView>
                    <Image source={require('../../imgs/bg_profile.jpg')} style={{ width: null, height: null, resizeMode: 'stretch' }}>
                        <View style={est.boxTopo}>
                            <View style={{ width: 100, height: 100, borderRadius: 100, borderWidth: 7, borderColor: "rgba(0,0,0,0.5)", overflow: 'hidden', padding: 0, margin: 0 }}>
                                <Image source={{ uri: this.userProfile.server_response.server_foto, width: 100, height: 100 }} style={est.imgUser} />
                            </View>
                        </View>
                    </Image>
                    <View style={{ padding: 20 }}>
                        <TextInput
                            placeholder="Nome"
                            style={est.input}
                            underlineColorAndroid="transparent"
                            onChangeText={text => this.setState({ nome: text })}
                            value={this.state.nome}
                        />
                        <TextInput
                            placeholder="E-mail"
                            style={est.input}
                            underlineColorAndroid="transparent"
                            onChangeText={text => this.setState({ email: text })}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            keyboardType={'email-address'}
                            value={this.state.email}
                        />
                        <TextInput
                            placeholder="Telefone"
                            style={est.input}
                            underlineColorAndroid="transparent"
                            autoCapitalize={'none'}
                            maxLength={15}
                            keyboardType={'numeric'}
                            onKeyPress={(e) => this.botaoPress(e)}
                            onChangeText={(text) => this.makeCel(text, 1)}
                            value={this.state.telefone}
                        />
                        <TextInput
                            placeholder="Nascimento"
                            autoCapitalize={'none'}
                            style={est.input}
                            underlineColorAndroid="transparent"
                            maxLength={10}
                            keyboardType={'numeric'}
                            onKeyPress={(e) => this.botaoPress(e)}
                            onChangeText={(text) => this.makeNiver(text, 1)}
                            value={this.state.niver}
                        />
                        <TextInput
                            placeholder="CPF"
                            autoCapitalize={'none'}
                            keyboardType={'numeric'}
                            underlineColorAndroid="transparent"
                            style={est.input}
                            maxLength={14}
                            onKeyPress={(e) => this.botaoPress(e)}
                            onChangeText={(text) => this.makeCpf(text, 1)}
                            value={this.state.cpf}
                        />

                        {this.show_pickers()}

                        <TouchableHighlight onPress={() => this.checkData()} style={{ backgroundColor: '#2B3845', alignItems: 'center', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 4 }} underlayColor="#2B3845">
                            <Text style={{ color: '#FFF' }}>Atualizar Perfil</Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Loading />
                </View>
            )
        }
    }

    loadCidades(id) {
        axios.get(URL_API + "cidades/" + id)
            .then(resp => {
                this.setState({ lista_cidades: resp.data.cidades });
            });
    }

    show_pickers() {
        if (Platform.OS == 'ios') {
            return (
                <View>
                    <ModalPicker
                        data={this.state.lista_estados}
                        initValue={this.state.optChoiceTxt}
                        onChange={(option) => { this.loadCidades(option.key); this.setState({ estado_id: option.key, estado: option.label }) }}>

                        <TextInput
                            style={est.input}
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
                            style={est.input}
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
                        style={est.inputBtn}
                        selectedValue={this.state.estado}
                        onValueChange={(itemValue, itemIndex) => { this.loadCidades(option.key); this.setState({ estado_id: itemIndex, estado: itemValue })} } >
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
                            style={est.inputBtn}
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

    render() {
        return (
            <View style={est.boxGeral}>
                <View style={est.ToolBar}>
                    <TouchableHighlight onPress={() => { this.props.hideModal() }} underlayColor="#FFF" style={{ flex: 1, paddingLeft:15 }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Icon name="md-close" size={20} color="#2B3845" />
                        </View>
                    </TouchableHighlight>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={{ fontSize: (Platform.OS == 'ios') ? 15 : 17, color: '#2B3845', fontWeight: 'bold' }}>Editar Perfil</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                    </View>
                </View>

                <View style={est.content}>
                    {this._load_profile()}
                </View>
                <Modal visible={this.state.visible} transparent={true} onRequestClose={() => false}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}>
                        <Loading />
                    </View>
                </Modal>
            </View>
        )
    }
}

const font = '';
if (Platform.OS == 'ios')
    font = 'OpenSans';
else
    font = 'OpenSans-Regular';

const est = StyleSheet.create({
    boxGeral: { flex: 1 },
    ToolBar: { paddingTop: (Platform.OS === 'ios') ? 20 : 0, height: 50, flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#FFF" },
    content: { backgroundColor: '#eee', flex: 1 },
    imgUser: { margin: -7, borderRadius: (Platform.OS == 'ios') ? 0 : 100, borderWidth: (Platform.OS == 'ios') ? 0 : 7, borderColor: "rgba(0,0,0,0.5)" },
    boxTopo: { paddingVertical: 15, alignItems: "center" },
    nomeUser: { backgroundColor: 'transparent', color: '#FFF', fontSize: (Platform.OS === 'ios') ? 16 : 19, fontFamily: 'OpenSans-ExtraBold' },
    nomeCidade: { backgroundColor: 'transparent', color: '#FFF', fontSize: (Platform.OS === 'ios') ? 14 : 16, fontFamily: font },
    boxBottom: { marginVertical: 15, paddingHorizontal: 40, flex: 1, justifyContent: 'space-around' },
    imgIcon: { height: 35, width: 35, resizeMode: "center", marginRight: 20 },
    btn: { flex: 1 },
    input: {
        height: 40, marginBottom: 15, backgroundColor: "#CCC", borderWidth: 1, borderColor: "#000",
        paddingHorizontal: (Platform.OS == 'ios') ? 15 : 12, fontSize: 16, color: '#2B3845'
    },
    textBtn: { fontSize: 16, color: '#2B3845' },
    inputBtn: {
        height: 40, marginBottom: 15, backgroundColor: "#CCC", borderWidth: 1, borderColor: "#000",
        paddingHorizontal: (Platform.OS == 'ios') ? 15 : 12, justifyContent: 'center'
    },
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
export default connect(mapStateToProps, {})(EditarPerfil);