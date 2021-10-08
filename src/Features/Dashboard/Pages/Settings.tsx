import React from 'react'
import { View, TextInput, Pressable } from 'react-native'
import Button from '../../../globalcomponents/Button'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { theme } from '../../../utils/theme'
import { Feather, Ionicons } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'

export default function Settings() {
    const [showing, setShowing] = React.useState(false)
    return (
        <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 30 }}>
            <Text color="black" fontSize="23px" fontWeight="bold">Change Password</Text>

                <Container width="100%" height="15%" justifyContent="center" alignItems="flex-start" marginTop="30px" >
                    <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">Old Password</Text>
                    <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="50px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                        <Ionicons name="lock-closed" size={25} color={theme.color} />
                        <TextInput style={{ flex: 1 }} secureTextEntry={showing} />
                        <Pressable onPress={() => setShowing(prev => !prev)}>
                            <Text fontSize="16px" color="grey" fontWeight="bold">
                                {showing ? 'SHOW':'HIDE'}
                            </Text>
                        </Pressable>
                    </Container>
                </Container>

                <Container width="100%" height="15%" justifyContent="center" alignItems="flex-start" marginTop="30px" >
                    <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">New Password</Text>
                    <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="50px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                        <Ionicons name="lock-closed" size={25} color={theme.color} />
                        <TextInput style={{ flex: 1 }} secureTextEntry={showing} />
                        <Pressable onPress={() => setShowing(prev => !prev)}>
                            <Text fontSize="16px" color="grey" fontWeight="bold">
                                {showing ? 'SHOW':'HIDE'}
                            </Text>
                        </Pressable>
                    </Container>
                </Container>

                <Container width="100%" height="15%" justifyContent="center" alignItems="flex-start" marginTop="30px" >
                    <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">Confirm Password</Text>
                    <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="50px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                        <Ionicons name="lock-closed" size={25} color={theme.color} />
                        <TextInput style={{ flex: 1 }} secureTextEntry={showing} />
                        <Pressable onPress={() => setShowing(prev => !prev)}>
                            <Text fontSize="16px" color="grey" fontWeight="bold">
                                {showing ? 'SHOW':'HIDE'}
                            </Text>
                        </Pressable>
                    </Container>
                </Container>

                <Container width="50%" height="55px" marginTop="30px">
                    <Button>
                        <Text color="white" fontSize="16px">Update</Text>
                    </Button>
                </Container>
        </ScrollView>
    )
}
