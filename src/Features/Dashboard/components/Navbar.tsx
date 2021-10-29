import React from 'react'
import { Image, StatusBar } from 'react-native'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { Feather, Ionicons } from '@expo/vector-icons'
import { theme } from '../../../utils/theme'
import { useNavigation } from '@react-navigation/native'
import { Platform, StyleSheet, View } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, } from 'react-native-reanimated'
import NetInfo from '@react-native-community/netinfo';

// redux
import { RootState, AppDispatch } from '../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { toValue } from '../../../States/Network'

export default function Navbar() {

    const green = '#437C89';
    const red = '#EC325A'
    const translateY = useSharedValue(-130);
    const color = useSharedValue<string>(red);

    // normal states
    const [text, setText] = React.useState('');
    const [previous, setPrevious] = React.useState(false);

    // redux states
    const connected = useSelector((state: RootState) => state.network.connected);
    const dispatch = useDispatch();
    const connnectionRef = React.useRef(false);

    React.useMemo(() => {
        // alert(connected? 'conneted': 'not connected');
        if (connected) {
            setText('Connection Restored');
            color.value = green;
            translateY.value = withTiming(0);
            setTimeout(() => {
                translateY.value = withSpring(-130);
            }, 2000);
        }else {
            setText('No Internet Connection');
            color.value = red;
            translateY.value = withTiming(0);
        }
    }, [connected])

    React.useEffect(() => {
        const interval = setInterval(async() => {
            const state = await NetInfo.fetch();
            if (state.isConnected) {
                dispatch(toValue(true));
                return;
            }
            dispatch(toValue(false));
        }, 5000);
        return () => {
            clearInterval(interval);
        }

    })

    const style = useAnimatedStyle(() => ({
        backgroundColor: color.value,
        transform: [
            {translateY: translateY.value}
        ]
    }))

    const navigation = useNavigation<any>()

    return (
        <>
        {/* no internet connection */}
        <Animated.View style={[StyleSheet.absoluteFillObject, {  width: '100%', height: 67, top: 0, left: 0, zIndex: 10, bottom: 0, elevation: 5, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 10 }, style]}>
            <Text style={{ fontSize: 18, color: 'white', fontWeight: Platform.OS === 'ios' ? '600':'bold' }}>{text}</Text>
        </Animated.View>

        <Container width="100%" height="150px" bgColor={theme.primaryBackgroundColor} flexDirection="row" justifyContent="space-between" paddingBottom="25px" alignItems="flex-end" paddingRight="20px" paddingLeft="20px">

            {/* statusbar */}
            <StatusBar translucent barStyle="light-content" />

            {/* logo */}
            <Container flexDirection="row" width="50%" height="50px" justifyContent="flex-start" alignItems="center" bgColor="transparent">
                <Text fontSize="23px" fontWeight="bold" color="white">Heritage</Text>
                <Text fontSize="23px" fontWeight="400" color="white" paddingLeft="5px">Exchange</Text>
            </Container>

            <Container width="50%" height="50px" bgColor="transparent" flexDirection="row" alignItems="center">
                <Container width="50px" height="50px" borderRadius="50px" bgColor="#FFFFFF3B" justifyContent="center" alignItems="center">
                    <Ionicons name="person" size={30} color="white" onPress={() => navigation.navigate('profile')} />
                </Container>
                <Container width="50px" height="50px" borderRadius="50px" bgColor="#FFFFFF3B" justifyContent="center" alignItems="center" marginLeft="10px">
                    <Ionicons size={30} color="white" name="notifications" onPress={() => navigation.navigate('notifications')} />
                </Container>
            </Container>

        </Container>
        </>
    )
}
