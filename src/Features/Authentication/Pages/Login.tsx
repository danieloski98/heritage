import React from 'react'
import { View, TextInput, Pressable, ScrollView } from 'react-native'
import Button from '../../../globalcomponents/Button'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { theme } from '../../../utils/theme'

export default function Login(props) {
    const [showing, setShowing] = React.useState(false)
    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white', minHeight: theme.screenHeight }} contentContainerStyle={{ height: theme.screenHeight}}>
            <Container width="100%" height="20%" bgColor="white" justifyContent="center" alignItems="flex-start" paddingLeft="20px" paddingRight="20px">
                <Text fontWeight="bold" fontSize="30px" color="black">HX</Text>
            </Container>
            <Container width="100%" height="10%" bgColor="white" alignItems="flex-start" paddingLeft="20px" paddingRight="20px">
                <Text color="black" fontSize="24px" fontWeight="bold">Glad  To See You Back</Text>
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">Sign In To Your Account To Continue</Text>
            </Container>

            <Container height="70%" width="100%" justifyContent="flex-start" bgColor="white" paddingLeft="20px" paddingRight="20px" marginTop="20px">

                <Container width="100%" height="15%" justifyContent="center" alignItems="flex-start">
                    <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">Email</Text>
                    <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="50px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                        <TextInput style={{ flex: 1 }} />
                    </Container>
                </Container>

                <Container width="100%" height="15%" justifyContent="center" alignItems="flex-start" marginTop="10px">
                    <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">Password</Text>
                    <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="50px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                        <TextInput style={{ flex: 1 }} secureTextEntry={showing} />
                        <Pressable onPress={() => setShowing(prev => !prev)}>
                            <Text fontSize="18px" color="grey" fontWeight="bold">
                                {showing ? 'SHOW':'HIDE'}
                            </Text>
                        </Pressable>
                    </Container>
                </Container>

                <Container width="100%" height="10%" justifyContent="flex-start" marginTop="20px">
                    <Button>
                        <Text>Sign in</Text>
                    </Button>
                </Container>

                <Container width="100%" height="5%" alignItems="center">
                    <Pressable
                        onPress={() => props.navigation.navigate('resetpassword')}
                    >
                        <Text textAlign="center" color={theme.primaryBackgroundColor} fontSize="16px" fontWeight="600">Forgot Password?</Text>
                    </Pressable>
                </Container>

                <Container width="100%" height="15%" justifyContent="center" alignItems="flex-end" flexDirection="row">
                    <Pressable
                        onPress={() => props.navigation.navigate('resetpassword')}
                    >
                        <Text textAlign="center" color="grey" fontSize="16px" fontWeight="600">Dont't Have An Account?</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => props.navigation.navigate('signup')}
                    >
                        <Text textAlign="center" color={theme.primaryBackgroundColor} fontSize="16px" fontWeight="600"> Create One</Text>
                    </Pressable>
                </Container>

            </Container>

        </ScrollView>
    )
}
