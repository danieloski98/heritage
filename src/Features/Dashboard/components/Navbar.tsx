import React from 'react'
import { Image, StatusBar } from 'react-native'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { Feather, Ionicons } from '@expo/vector-icons'
import { theme } from '../../../utils/theme'
import { useNavigation } from '@react-navigation/native'

export default function Navbar() {

    const navigation = useNavigation<any>()

    return (
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
    )
}
