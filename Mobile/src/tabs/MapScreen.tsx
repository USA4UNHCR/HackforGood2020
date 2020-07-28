import * as React from 'react';
import { Text, View } from 'react-native';

export const MapScreen = React.memo(() => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Map!</Text>
        </View>
    )
});