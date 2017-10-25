import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableHighlight, Platform, Alert, StyleSheet, Dimensions, Modal } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

class AnuncioParceiro extends Component {
    constructor(props){
        super(props);

        this.state = { aba: 1, listaImgs: [], width: 0, height: 0, visible: false, images: [] };
    }

    componentDidMount() {
        this.setState({ width: Dimensions.get('window').width, height: Dimensions.get('window').height });
    }

    _backHistory() {
        Actions.pop();
    }

    _loadImageView(url) {
        this.setState({ visible: true, images: [{ url: url }] })
    }

    _loadBottomComponent() {
        if (this.state.aba == 1) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ScrollView>
                        <Text style={est.txtDet}>{this.props.item.sinopse}</Text>
                    </ScrollView>
                </View>
            )
        } else if(this.state.aba == 2) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ScrollView>
                        <Text style={est.txtDet}>{this.props.item.detalhes}</Text>
                    </ScrollView>
                </View>
            )
        } else {
            if (this.props.item.Imagens != undefined && this.props.item.Imagens.length > 0) {
                return (
                     <ScrollView>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {
                            this.props.item.Imagens.map((item) => {
                                return (
                                    <View style={{ width: (this.state.width / 3), marginTop: 10, alignItems: 'center' }} key={'imgs-'+item.id}>
                                        <TouchableHighlight onPress={() => this._loadImageView(item.url)}>
                                            <Image indicator={Progress.Circle} indicatorProps={{ showsText: true }} source={{ uri: item.url, width: 70, height: 110 }} style={{ width: 70, height: 110, backgroundColor: '#eee' }} />
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

    render(){
        return(
            <View style={est.boxGeral}>
                <Modal visible={this.state.visible} transparent={true} onRequestClose={() => false}>
                    <View style={{ flex: .1, backgroundColor: 'rgba(0,0,0,1)', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <TouchableHighlight underlayColor="transparent" onPress={() => this.setState({ visible: false, images: [] })}>
                            <Text style={{ color: '#FFF', paddingBottom: 7 }}>Fechar</Text>
                        </TouchableHighlight>
                    </View>
                    <ImageViewer imageUrls={this.state.images} />
                </Modal>
                <View style={est.ToolBar}>
                    <TouchableHighlight onPress={() => { this._backHistory() }} underlayColor="#FFF" style={{ flex: .3 }}>
                        <View style={{ flex: 1, justifyContent:'center' }}>
                            <Icon name="md-arrow-round-back" size={20} color="#2B3845" />
                        </View>
                    </TouchableHighlight>
                    <View style={{ flex: 1, alignItems: "center", overflow: 'hidden' }}>
                            <Text style={{ fontSize: (Platform.OS == 'ios') ? 15 : 17, color: '#2B3845', fontWeight: 'bold' }}>{this.props.empresa}</Text>
                    </View>
                    <View style={{ flex: .3 }}>
                    </View>
                </View>
                <View style={est.content}>

                    <View style={est.boxTopo}>
                        <Image source={require('../imgs/bg_livro_empresa.jpg')} style={{ flex: 1, resizeMode: 'stretch', width: null }}>
                            <View style={{ flex: 1, padding: 20, flexDirection: 'row', alignItems: 'center' }}>
                                <Image indicator={Progress.Circle} indicatorProps={{ showsText: true }} source={{ uri: this.props.item.imagem, width: 90, height: 130, }} style={{ width: 90, height: 130 }} />
                                <View style={{ paddingLeft: 15, flexGrow: 1, width:0}}>
                                    <Text style={[est.trans, { color: '#FFF', fontSize: 16, marginBottom: 15, fontWeight: 'bold' }]}>{this.props.item.titulo}</Text>
                                    <Text style={[est.trans, { color: '#FFF', fontSize: 14.5, paddingBottom: 30 }]}>R$ {this.props.item.preco}</Text>
                                </View>
                            </View>
                            <View style={{ position: 'absolute', bottom: 5, right: 5, alignItems: 'flex-end' }}>
                                <TouchableHighlight onPress={ () => false } underlayColor="transparent" style={{ backgroundColor:'#30345F', paddingVertical:5, paddingHorizontal:13, borderRadius:20}}>
                                    <Text style={[est.trans, { fontSize: 15, color: '#fff' }]}>Comprar</Text>
                                </TouchableHighlight>
                            </View>
                        </Image>
                    </View>
                    <View style={est.boxMeio}>
                        <TouchableHighlight onPress={() => this.setState({ aba: 1 })} style={[est.opcao, (this.state.aba == 1) ? est.abaAtiva : est.abaNormal]} underlayColor="transparent">
                            <Text style={est.textOpcao}>Sinopse</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.setState({ aba: 2 })} style={[est.opcao, (this.state.aba == 2) ? est.abaAtiva : est.abaNormal]} underlayColor="transparent">
                            <Text style={est.textOpcao}>Detalhes</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.setState({ aba: 3 })} style={[est.opcao, (this.state.aba == 3) ? est.abaAtiva : est.abaNormal]} underlayColor="transparent">
                            <Text style={est.textOpcao}>Imagens</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={est.boxBottom}>
                        {this._loadBottomComponent()}
                    </View>
                </View>
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
    boxGeral: {
        flex: 1,
    },
    ToolBar: { paddingTop: (Platform.OS === 'ios') ? 20 : 0, height: 50, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, backgroundColor: "#FFF" },
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

export default AnuncioParceiro;