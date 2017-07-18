import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Platform, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class BoxDesejo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={sty.box}>
                <View style={sty.boxBg}>
                    <View style={{ flex:1}}>
                        <View style={{position:'absolute', borderRadius:6, top:0,left:0, width:72, height:107, elevation: 6, padding:0,margin:0, shadowColor: '#000',shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.5,shadowRadius: 2, position:'relative' }}>
                            <Image source={{ uri: this.props.item.imagem, width: 72, height: 107 }} style={sty.IMGLIVRO} />
                        </View>
                    </View>
                    <View style={{ flex: .3}}></View>
                    <View style={{ flex: 3, position:'relative'}}>
                        <Text style={ sty.titulo }>{ this.props.item.titulo }</Text>
                        <Text style={[sty.data],{ color: (this.props.item.status == 'Indisponível') ? '#970909':'#387E14' }}>{ this.props.item.status }</Text>
                        <TouchableHighlight onPress={ () => this.props.deleteItem(this.props.item.id) } underlayColor="transparent" style={{ position: 'absolute', bottom: 0, right:0 }}>
                            <Image source={ require('../../imgs/icones/delete.png') } style={{ width: 25, height: 25}}/>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={ () => false } underlayColor="transparent" style={{position: 'absolute', bottom: 0, right:40}}>
                            <Image source={ require('../../imgs/icones/edit.png') } style={{ width: 25, height: 25 }}/>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}

const font = '';
if(Platform.OS == 'ios')
    font = 'OpenSans';
else
    font = 'OpenSans-Regular';

const sty = StyleSheet.create({
    box: { flex: 1, backgroundColor:'#FFF', flexDirection: "row", height: 127, marginTop: 7, marginHorizontal: 15, marginBottom: 10, padding: 10, borderRadius: 4, elevation: 4, shadowColor: '#000',shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.5,shadowRadius: 2 },
    boxBg:{ flex:1, flexDirection: 'row'},
    //boxBg: { flex: 1, position: 'relative', backgroundColor: "#FFF", padding: 10, flexDirection: "row", borderRadius: 6, elevation: 4, shadowColor: '#000',shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.5,shadowRadius: 2 },
    IMGLIVRO: { resizeMode: "stretch", borderRadius: 6 },
    titulo:{fontFamily: font, fontSize: (Platform.OS == 'ios') ? 14:16, color: "#424b54", paddingBottom: 10},
    data:{fontFamily: font, fontSize: (Platform.OS == 'ios') ? 12:14, color: "#93a8ac", marginBottom: 10, fontWeight:'bold'}
})