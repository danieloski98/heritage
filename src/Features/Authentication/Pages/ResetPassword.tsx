import React from 'react'
import { TextInput, Pressable, ScrollView , View, Image, Platform } from 'react-native'
import Button from '../../../globalcomponents/Button'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { theme } from '../../../utils/theme'
import { Ionicons } from '@expo/vector-icons'

export default function ResetPassword(props: any) {
    return (
        <View style={{ flex: 1, backgroundColor: theme.darkBlue }}>

            <View style={{ flex: 0.15, backgroundColor: theme.darkBlue, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
               <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={{ fontWeight: Platform.OS === 'ios' ? '600':'bold', fontSize: 25, color: 'white' }}>Heritage</Text>
                    <Text style={{ fontWeight: '300', fontSize: 25, color: 'white', marginLeft: 5 }}>Exchange</Text>
               </View>
               <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Image source={require('../../../../assets/crypto/BTC.png')} resizeMode="contain" style={{ width: '30%', height: '100%', left: 90, bottom: -70, position: 'absolute' }} />
                    <Image source={require('../../../../assets/crypto/ETC.png')} resizeMode="contain" style={{ width: '40%', height: '100%', left: 30, bottom: -70, position: 'absolute' }} />
               </View>
           </View>

            <View style={{ flex: 0.85, borderTopLeftRadius: 30, overflow: 'hidden', }}>

                <ScrollView style={{ flex: 1, backgroundColor: 'white', minHeight: theme.screenHeight, overflow: 'hidden', borderTopLeftRadius: 30 }} contentContainerStyle={{ height: theme.screenHeight, overflow: 'hidden', borderTopLeftRadius: 30}}>
                    {/* <Container width="100%" height="20%" bgColor="white" justifyContent="center" alignItems="flex-start" paddingLeft="20px" paddingRight="20px">
                        <Text fontWeight="bold" fontSize="30px" color="black">HX</Text>
                    </Container> */}
                    <View style={{ paddingHorizontal: 20, justifyContent: 'center', height: '10%'  }}>
                        <Text color="black" fontSize="24px" fontWeight="bold">Forgot Password</Text>
                        <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">
                            We’ll send you a link to reset your password 
                            via email
                        </Text>
                    </View>

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
                
            </View>

        </View>
    )
}
