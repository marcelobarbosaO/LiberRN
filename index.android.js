import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import App from './src/App';

class LiberApp extends Component {
	render() {
		return (
			<App />
		);
	}
}

AppRegistry.registerComponent('LiberApp', () =>LiberApp);