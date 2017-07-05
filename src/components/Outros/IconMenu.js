import React, { Component } from 'react';
import { TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class IconMenu extends Component {
    constructor(props) {
        super(props);
    }

    static contextTypes = { drawer: React.PropTypes.object }

    _openMenu() {
        this.context.drawer.open();
    }

    _closeMenu() {
        this.context.drawer.close();
    }

    render() {
        return (
            <TouchableHighlight onPress={() => { this._openMenu() }} underlayColor="#FFF">
                <Icon name="md-menu" size={20} color="#2B3845" />
            </TouchableHighlight>
        )
    }
}