import React from 'react'
import { View, TextInput, Pressable } from 'react-native'
import Button from '../../../globalcomponents/Button'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { theme } from '../../../utils/theme'
import { Feather } from '@expo/vector-icons'

export default function PersonalInfoForm() {
    const [showing, setShowing] = React.useState(false)
    return (
        <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 30 }}>

        <Container width="100%" height="15%" justifyContent="center" alignItems="flex-start" marginTop="10px" >
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">Firstname</Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Feather name="user" size={25} color="grey" />
                    <TextInput style={{ flex: 1 }} secureTextEntry={showing} />
                </Container>
            </Container>

            <Container width="100%" height="15%" justifyContent="center" alignItems="flex-start" marginTop="20px" >
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">Lastname</Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Feather name="user" size={25} color="grey" />
                    <TextInput style={{ flex: 1 }} secureTextEntry={showing} />
                </Container>
            </Container>

            <Container width="100%" height="15%" justifyContent="center" alignItems="flex-start" marginTop="20px" >
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">Email</Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Feather name="mail" size={25} color="grey" />
                    <TextInput style={{ flex: 1 }} secureTextEntry={showing} />
                </Container>
            </Container>

            <Container width="100%" height="15%" justifyContent="center" alignItems="flex-start" marginTop="20px" >
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">Phone</Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Feather name="lock" size={25} color="grey" />
                    <TextInput style={{ flex: 1 }} secureTextEntry={showing} />
                </Container>
            </Container>

            <Container width="50%" height="55px" marginTop="20px">
                <Button>
                    <Text color="white" fontSize="16px">Update</Text>
                </Button>
            </Container>
    </View>
    )
}
