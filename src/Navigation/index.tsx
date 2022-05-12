import React, { useCallback, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Authentication from './Authentication'
import Dashboard from './Dashboard';
import { ActivityIndicator, Platform, View } from 'react-native';
import { useSharedValue, useAnimatedStyle, withSpring, withTiming, } from 'react-native-reanimated'
import * as Font from 'expo-font';
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../States/LoggedIn'

import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components'
import { theme } from '../utils/theme';
import { RootState } from '../store';

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
    const [font, setFont] = React.useState(true);
    const [loggedin, setLoggedin] = React.useState(false);
    const loggedIn = useAsyncStorage('loggedIn');
    const dispatch = useDispatch();
    const loggedinState = useSelector((state: RootState) => state.loggedin.loggedin);

    React.useEffect(() => {
        (async function() {
            const val = await loggedIn.getItem();

            if (val === 'true') {
                dispatch(login());
            } else {
                dispatch(logout());
            }
        })()
    }, []);

    const loadFonts = useCallback(async () => {
        await Font.loadAsync({
            'Inter-Bold': {
                uri: require('../../assets/fonts/Inter-Bold.ttf'),
                display: Font.FontDisplay.FALLBACK, 
            },
            'Inter-SemiBold': {
                uri: require('../../assets/fonts/Inter-SemiBold.ttf'),
                display: Font.FontDisplay.FALLBACK, 
            },
            'Inter-Medium': {
                uri: require('../../assets/fonts/Inter-Medium.ttf'),
                display: Font.FontDisplay.FALLBACK, 
            },
            'Inter-Regular': {
                uri: require('../../assets/fonts/Inter-Regular.ttf'),
                display: Font.FontDisplay.FALLBACK, 
            },
            'Inter-Light': {
                uri: require('../../assets/fonts/Inter-Light.ttf'),
                display: Font.FontDisplay.FALLBACK, 
            },
        });
        setFont(false);
    }, [])

    useEffect(() => {
        (async function() {
            loadFonts();
        })()
    }, []);

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
    if (font) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={theme.primaryBackgroundColor} />
            </View>
        )
    }
    return (
        <Wrapper>
            <ApplicationProvider {...eva} theme={eva.light}>
                <NavigationContainer>
                    { loggedinState ? <Dashboard /> : <Authentication /> }
                </NavigationContainer>
            </ApplicationProvider>
        </Wrapper>
    )
}
