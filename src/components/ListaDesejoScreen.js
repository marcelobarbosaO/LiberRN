import React, { Component } from 'react';
import Drawer from 'react-native-drawer';

import Menu from './Outros/Menu';
import Index from './ListaDesejo/Index';

class ListaDesejoScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                content={<Menu />}
                openDrawerOffset={50}
                tweenDuration={100}
                type="overlay"
                panCloseMask={0.2}
                tapToClose={true}
                styles={DrawerStyle}
                tweenHandler={(ratio) => ({
                    mainOverlay: { opacity: ((ratio * 8) / 10) }
                })}
            >
                <Index/>
            </Drawer>
        );
    }
}

const DrawerStyle = {
    mainOverlay: { backgroundColor: "rgba(0,0,0,1)", opacity: 0 }
}

export default ListaDesejoScreen;