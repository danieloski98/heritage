import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Authentication from './Authentication'
import { Platform, View } from 'react-native';
import { useSharedValue, useAnimatedStyle, withSpring, withTiming, } from 'react-native-reanimated'

import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components'

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
            <ApplicationProvider {...eva} theme={eva.light}>
                <NavigationContainer>
                    <Authentication />
                </NavigationContainer>
            </ApplicationProvider>
        </Wrapper>
    )
}
