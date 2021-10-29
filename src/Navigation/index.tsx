import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Authentication from './Authentication'
import Dashboard from './Dashboard'
import { SafeAreaView, Platform, View, StyleSheet, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, } from 'react-native-reanimated'
import { theme } from '../utils/theme';

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
            <View style={{ flex: 1, zIndex: 2 }}>
                { props.children }
            </View>
        </View>
    )

}

export default function Index() {
    const translateY = useSharedValue(-130);

    React.useEffect(() => {
        translateY.value = withSpring(-130);

        setTimeout(() => {
            translateY.value = withTiming(0);
        }, 5000);
    })

    const style = useAnimatedStyle(() => ({
        transform: [
            {translateY: translateY.value}
        ]
    }))
    return (
        <Wrapper>
            <NavigationContainer>
                <Authentication />
            </NavigationContainer>
        </Wrapper>
    )
}
