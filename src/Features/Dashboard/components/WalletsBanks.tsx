import React from 'react'
import { Pressable, TextInput, View,  } from 'react-native'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { theme } from '../../../utils/theme'
import { Feather, Ionicons } from '@expo/vector-icons'
import Button from '../../../globalcomponents/Button'

export default function WalletsBanks() {
    return (
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 30, paddingBottom: 200 }}>
            <Text fontSize="20px" color="black" fontWeight="bold">My Wallet Addresses</Text>

            <Container width="100%" height="80px" justifyContent="center" alignItems="flex-start" marginTop="20px" >
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="0px">BTC Address</Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Ionicons name="wallet" size={25} color={theme.color} />
                    <TextInput style={{ flex: 1 }} />
                </Container>
            </Container>

            <Container width="100%" height="80px" justifyContent="center" alignItems="flex-start" marginTop="20px" >
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="0px">ETH Address</Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Ionicons name="wallet" size={25} color={theme.color} />
                    <TextInput style={{ flex: 1 }} />
                </Container>
            </Container>

            <Container width="100%" height="80px" justifyContent="center" alignItems="flex-start" marginTop="20px" >
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="0px">USDT Address</Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Ionicons name="wallet" size={25} color={theme.color} />
                    <TextInput style={{ flex: 1 }} />
                </Container>
            </Container>

            <Text fontSize="20px" color="black" fontWeight="bold" marginTop="40px">My Bank Details</Text>

            <Container width="100%" height="80px" justifyContent="center" alignItems="flex-start" marginTop="20px" >
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="0px">Account Name</Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Ionicons name="person" size={25} color={theme.color} />
                    <TextInput style={{ flex: 1 }} />
                </Container>
            </Container>

            <Container width="100%" height="80px" justifyContent="center" alignItems="flex-start" marginTop="20px" >
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="0px">Bank Name</Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Ionicons name="card" size={25} color={theme.color} />
                    <TextInput style={{ flex: 1 }} />
                </Container>
            </Container>

            <Container width="100%" height="80px" justifyContent="center" alignItems="flex-start" marginTop="20px" >
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="0px">Account Number</Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Ionicons name="card" size={25} color={theme.color} />
                    <TextInput style={{ flex: 1 }} />
                </Container>
            </Container>

            <Container width="50%" height="55px" marginTop="20px">
                <Pressable style={{ width: '100%'}} android_ripple={{ radius: 10, color: 'white', borderless: false }} >
                    <Button>
                        <Text color="white">Update</Text>
                    </Button>
                </Pressable>
            </Container>
        </View>
    )
}
