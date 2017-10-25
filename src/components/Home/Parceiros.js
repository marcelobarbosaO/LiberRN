import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions, TouchableHighlight, Platform, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import Carousel from 'react-native-snap-carousel';
import { Actions, ActionConst } from 'react-native-router-flux';

import ErrorNetwork from '../Outros/ErrorNetwork';
import Loading from '../Outros/Loading';

class Parceiros extends Component {
    constructor(props) {
        super(props);

        this.state = { width: 0, height: 0, loadLivros: false, loadSlides: false, slides: [], livros: [], errorNetWork: false, errorNumber: 0 };

        this.reloadFuncaoParceiro = this.reloadFuncaoParceiro.bind(this);
        this._loadSlides();
        this._loadLivros();
    }

    componentDidMount() {
        this.setState({ width: Dimensions.get('window').width, height: 150 });
    }

    _loadSlides() {
        axios.get('http://liberapp.com.br/api/slides_parceiros')
            .then((response) => {
                if (response.data.status == 0 || response.data.status == "0") {
                    this.setState({ loadSlides: true, slides: response.data.slides });
                } else {
                    this.setState({ loadSlides: true, slides: [], errorNetWork: true, errorNumber: 3 });
                }
            }).catch((data) => {
                if (data == 'Error: Network Error') {
                    this.setState({ loadSlides: false, errorNetWork: true, errorNumber: 2 });
                } else {
                    this.setState({ loadSlides: false, errorNetWork: true, errorNumber: 0 });
                }
            });
    }

    _loadLivros() {
        axios.get('http://liberapp.com.br/api/livros_parceiros')
            .then((response) => {
                if (response.data.status == 0 || response.data.status == "0") {
                    this.setState({ loadLivros: true, livros: response.data.parceiros });
                } else {
                    this.setState({ loadLivros: true, livros: [], errorNetWork: true, errorNumber: 3 });
                }
            }).catch((data) => {
                if (data == 'Error: Network Error') {
                    this.setState({ loadLivros: false, errorNetWork: true, errorNumber: 2 });
                } else {
                    this.setState({ loadLivros: false, errorNetWork: true, errorNumber: 0 });
                }
            });
    }

    _openLink(url) {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                Alert.alert("Não é possível abrir essa URL");
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => Alert.alert("Não é possível abrir essa URL"));
    }

    _openPageBook(item, empresa){
        //alert(JSON.stringify(item));
        Actions.AnuncioParceiroScreen({ item: item, empresa: empresa });
    }

    _renderSlides() {
        if (this.state.loadSlides) {
            if (!this.state.errorNetWork) {
                return (
                    <Swiper style={sty.wrapper} height={150} loop={false} showsButtons={false} paginationStyle={{ bottom: 0 }}>
                        {this.state.slides.map((item) => {
                            return (
                                <TouchableHighlight onPress={() => this._openLink(item.url)} underlayColor="transparent" style={sty.slide} key={'slide-' + item.id}>
                                    <Image indicator={Progress.Circle} indicatorProps={{ showsText: true }} source={{ uri: item.imagem, width: this.state.width, height: 150 }} />
                                </TouchableHighlight>
                            )
                        })
                        }
                    </Swiper>
                )
            } //se nao tiver nenhum slide nao mostra o component
        } else {
        }
    }

    _renderLivros() {
        if (this.state.loadLivros) {
            if (!this.state.errorNetWork) {
                return (
                    this.state.livros.map((item) => {
                        return (
                            <View style={{ backgroundColor: item.cor, paddingVertical: 15, paddingLeft: 15 }} key={'parc-' + item.id}>
                                <Text style={[sty.openSans,{ color: item.corTexto, fontSize: 14 }]}>{item.empresa}</Text>
                                <Carousel
                                    style={{ backgroundColor:'#f00'}}
                                    ref={(carousel) => { this._carousel = carousel; }}
                                    sliderWidth={this.state.width}
                                    itemWidth={90}
                                >
                                { item.Livros.map( (book) => {
                                        return(
                                            <TouchableHighlight onPress={ () => this._openPageBook(book, item.empresa) } key={'book-' + book.id} underlayColor="transparent">
                                                <Image source={{ uri: book.imagem, width: 90, height: 130}} style={{ width:90, height: 130, backgroundColor:'#000'}} />
                                            </TouchableHighlight>
                                        )
                                    })
                                }
                                </Carousel>
                            </View>
                        )
                    })
                )
            } else {
                <ErrorNetwork error={{ erro: this.state.errorNumber }} reloadFuncao={this.reloadFuncaoParceiro} />
            }
        } else {
            return (
                <Loading />
            )
        }
    }

    reloadFuncaoParceiro() {
        this.setState({ loadLivros: false, loadSlides: false, errorNetWork: false, errorNumber: 0 });
        this._loadSlides();
        this._loadLivros();
    }

    render() {
        return (
            <ScrollView style={sty.boxGeral}>
                {this._renderSlides()}
                {this._renderLivros()}
            </ScrollView>
        );
    }
};

const font = '';
if (Platform.OS == 'ios')
    font = 'OpenSans';
else
    font = 'OpenSans-Regular';

const sty = StyleSheet.create({
    boxGeral: { flex: 1, backgroundColor: "#eee" },
    wrapper: {
    },
    slide: {
        flex: 1,
        backgroundColor: '#eee',
    },
    openSans: { fontFamily: font}
})

export default Parceiros;