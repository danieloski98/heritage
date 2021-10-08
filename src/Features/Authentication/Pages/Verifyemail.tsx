import React from 'react'
import { TextInput, Pressable, ScrollView } from 'react-native'
import Button from '../../../globalcomponents/Button'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { theme } from '../../../utils/theme'
import { Feather, Ionicons } from '@expo/vector-icons'

export default function Verifyemail(props: any) {
    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white', minHeight: theme.screenHeight }} contentContainerStyle={{ height: theme.screenHeight}}>
        <Container width="100%" height="20%" bgColor="white" justifyContent="center" alignItems="flex-start" paddingLeft="20px" paddingRight="20px">
            <Text fontWeight="bold" fontSize="30px" color="black">HX</Text>
        </Container>
        <Container width="100%" height="10%" bgColor="white" alignItems="flex-start" paddingLeft="20px" paddingRight="20px">
            <Text color="black" fontSize="24px" fontWeight="bold">Verify Email Address</Text>
            <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">
                Enter the code sent to your email address
            </Text>
        </Container>

        <Container height="70%" width="100%" justifyContent="flex-start" bgColor="white" paddingLeft="20px" paddingRight="20px" marginTop="20px">

            <Container width="100%" height="15%" justifyContent="center" alignItems="flex-start" bgColor="white" >
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">Code</Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="50px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Ionicons color={theme.color} size={30} name="finger-print" />
                    <TextInput style={{ flex: 1 }} />
                </Container>
            </Container>


            <Container width="100%" height="10%" justifyContent="flex-start" marginTop="20px" bgColor="white" >
                <Button>
                    <Text color="white">Verify Email Address</Text>
                </Button>
            </Container>

            <Container width="100%" height="5%" alignItems="center" bgColor="white" >
                    <Pressable
                        onPress={() => props.navigation.navigate('resetpassword')}
                    >
                        <Text textAlign="center" color="grey" fontSize="16px" fontWeight="600">Resend Code</Text>
                    </Pressable>
                </Container>


        </Container>

    </ScrollView>
    )
}
