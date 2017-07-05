import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Index extends Component {
    constructor(props) {
        super(props);
    }

    static contextTypes = { drawer: React.PropTypes.object }

    _openMenu() {
        this.context.drawer.open();
    }

    render() {
        return (
            <View style={est.boxGeral}>
                <View style={est.ToolBar}>
                    <View style={{ flex: 1 }}>
                        <TouchableHighlight onPress={() => { this._openMenu() }} underlayColor="#FFF">
                            <Icon name="md-menu" size={20} color="#2B3845" />
                        </TouchableHighlight>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text>Perfil</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                    </View>
                </View>

                <View>
                    <Text>assasaasas</Text>
                </View>
            </View>
        );
    }
}

const est = StyleSheet.create({
    boxGeral: { flex: 1 },
    ToolBar: { height: 50, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, backgroundColor: "#f90" }
});

export default Index;