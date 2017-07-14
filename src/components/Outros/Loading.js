import React from 'react';
import { View, Text, ActivityIndicator} from 'react-native';

export default props => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#10817F" />
        <Text>Carregando. Aguarde...</Text>
    </View>
);