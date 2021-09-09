import React from 'react'
import { View } from 'react-native'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { Feather } from '@expo/vector-icons'
import { theme } from '../../../utils/theme'

export default function Navbar() {
    return (
        <Container width="100%" height="150px" bgColor={theme.primaryBackgroundColor} flexDirection="row" justifyContent="space-between" paddingBottom="25px" alignItems="flex-end" paddingRight="20px" paddingLeft="20px">

            {/* logo */}
            <Container flexDirection="row" width="50%" height="50px" justifyContent="flex-start" alignItems="center" bgColor="transparent">
                <Text fontSize="23px" fontWeight="bold" color="white">Heritage</Text>
                <Text fontSize="23px" fontWeight="400" color="white" paddingLeft="5px">Exchange</Text>
            </Container>

            <Container width="50%" height="50px" bgColor="transparent" flexDirection="row" alignItems="center">
                <Container width="50px" height="50px" borderRadius="50px" bgColor="lightgrey"></Container>
                <Container width="50px" height="50px" borderRadius="50px" bgColor="#FFFFFF3B" justifyContent="center" alignItems="center" marginLeft="10px">
                    <Feather size={30} color="white" name="bell" />
                </Container>
            </Container>

        </Container>
    )
}
