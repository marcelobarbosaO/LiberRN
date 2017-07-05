import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Vender extends Component {
    render(){
        return(
            <View style={ sty.boxGeral }>
                <Text>PARCEIROS</Text>
            </View>
        );
    }
};

const sty = StyleSheet.create({
    boxGeral: { flex: 1, justifyContent:"center", alignItems:"center", backgroundColor: "#eee" }
})