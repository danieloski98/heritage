import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Authentication from './Authentication'
import Dashboard from './Dashboard'
import { SafeAreaView, Platform, View } from 'react-native';

const Wrapper = (props) => {
    if (Platform.OS === 'ios') {
        return (
            <View style={{ flex: 1 }} >
                {props.children}
            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            { props.children }
        </View>
    )

}

export default function Index() {
    return (
        <Wrapper>
            <NavigationContainer>
                <Authentication />
            </NavigationContainer>
        </Wrapper>
    )
}
