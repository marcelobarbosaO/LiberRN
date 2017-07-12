import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';

class Slides extends Component {
    render() {
        return (
            <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
                <View style={styles.slide1}>
                    <Text style={styles.text}>Hello Swiper</Text>
                </View>
                <View style={styles.slide2}>
                    <Text style={styles.text}>Beautiful</Text>
                </View>
                <View style={styles.slide3}>
                    <Text style={styles.text}>And simple</Text>
                    <TouchableHighlight onPress={ () => Actions.LoginScreen() } style={{position:'absolute', top: 25, right:15}}>
                        <Text style={{color:'#FFF', fontSize: 18}}>Fechar</Text>
                    </TouchableHighlight>
                </View>
            </Swiper>
        )
    }
}

var styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        position:'relative'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
        position:'relative'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
        position:'relative'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
})

export default Slides;