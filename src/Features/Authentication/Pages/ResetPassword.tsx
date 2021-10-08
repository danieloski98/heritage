import React from 'react'
import { TextInput, Pressable, ScrollView } from 'react-native'
import Button from '../../../globalcomponents/Button'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { theme } from '../../../utils/theme'
import { Ionicons } from '@expo/vector-icons'

export default function ResetPassword(props: any) {
    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white', minHeight: theme.screenHeight }} contentContainerStyle={{ height: theme.screenHeight}}>
        <Container width="100%" height="20%" bgColor="white" justifyContent="center" alignItems="flex-start" paddingLeft="20px" paddingRight="20px">
            <Text fontWeight="bold" fontSize="30px" color="black">HX</Text>
        </Container>
        <Container width="100%" height="10%" bgColor="white" alignItems="flex-start" paddingLeft="20px" paddingRight="20px">
            <Text color="black" fontSize="24px" fontWeight="bold">Forgot Password</Text>
            <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">
                We’ll send you a link to reset your password 
                via email
            </Text>
        </Container>

        <Container height="70%" width="100%" justifyContent="flex-start" bgColor="white" paddingLeft="20px" paddingRight="20px" marginTop="20px">

            <Container width="100%" height="15%" justifyContent="center" alignItems="flex-start" marginTop="20px" bgColor="white">
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">Email</Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Ionicons name="mail" size={25} color={theme.color} />
                    <TextInput style={{ flex: 1 }} />
                </Container>
            </Container>


            <Container width="100%" height="10%" justifyContent="flex-start" marginTop="20px">
                <Button>
                    <Text color="white">Send Reset Link</Text>
                </Button>
            </Container>


        </Container>

    </ScrollView>
    )
}
