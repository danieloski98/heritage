import React from 'react'
import { TextInput, Pressable, ScrollView , View, Image, Platform, ActivityIndicator, Alert } from 'react-native'
import Button from '../../../globalcomponents/Button'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { theme } from '../../../utils/theme'
import { Ionicons } from '@expo/vector-icons'
import liveURL from '../../../utils/url'
import url from '../../../utils/url'
import { IReturnType } from '../../../Types/ReturnType'

export default function ResetPassword(props: any) {
    const [loading, setLoading] = React.useState(false);
    const [otp, setOtp] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const request = async () => {
        if (otp === "") {
            Alert.alert("Warning", "Please fill in your otp code sent to your email.");
            return;
        }

        if (password === "" || confirmPassword === "") {

        }

        setLoading(true);
        const req = await fetch(`${url}auth/resetpassword/${otp}`, {
            method: 'put',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ newpassword: password, confirmpassword: confirmPassword }),
        });

        const json = await req.json() as IReturnType;
        setLoading(false);
        if (json.statusCode !== 200) {
            Alert.alert('Error', json.errorMessage);
            return;
        } 
        Alert.alert('Success', json.successMessage);
        props.navigation.navigate('login');
        return;
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme.darkBlue }}>

            <View style={{ flex: 0.2, backgroundColor: theme.darkBlue, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
               <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={{ fontWeight: Platform.OS === 'ios' ? '600':'bold', fontSize: 25, color: 'white' }}>Heritage</Text>
                    <Text style={{ fontWeight: '300', fontSize: 25, color: 'white', marginLeft: 5 }}>Exchange</Text>
               </View>
               <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Image source={require('../../../../assets/crypto/BTC.png')} resizeMode="contain" style={{ width: '30%', height: '100%', left: 120, bottom: -75, position: 'absolute' }} />
                    <Image source={require('../../../../assets/crypto/ETC.png')} resizeMode="contain" style={{ width: '40%', height: '100%', left: 70, bottom: -75, position: 'absolute' }} />
               </View>
           </View>

            <View style={{ flex: 0.85, borderTopLeftRadius: 30, overflow: 'hidden', }}>

                <ScrollView style={{ flex: 1, backgroundColor: 'white', minHeight: theme.screenHeight, overflow: 'hidden', borderTopLeftRadius: 30 }} contentContainerStyle={{ height: theme.screenHeight, overflow: 'hidden', borderTopLeftRadius: 30}}>
                   
                    <View style={{ paddingHorizontal: 20, justifyContent: 'center', height: 100  }}>
                        <Text color="black" fontSize="24px" fontWeight="bold">Change Password</Text>
                        <Text color="gray" fontSize="16px" fontWeight="500" marginTop="10px">
                           Create a new secure password
                        </Text>
                    </View>

                    <Container height="70%" width="100%" justifyContent="flex-start" bgColor="white" paddingLeft="20px" paddingRight="20px" marginTop="30px">

                        <Container width="100%" height="15%" justifyContent="center" alignItems="flex-start" marginTop="20px" bgColor="white">
                            <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">OTP Code</Text>
                            <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                                <Ionicons name="mail" size={25} color={theme.color} />
                                <TextInput style={{ flex: 1 }} value={otp} onChangeText={(e) => setOtp(e)} />
                            </Container>
                        </Container>

                        <Container width="100%" height="15%" justifyContent="center" alignItems="flex-start" marginTop="20px" bgColor="white">
                            <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">Password</Text>
                            <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                                <Ionicons name="mail" size={25} color={theme.color} />
                                <TextInput secureTextEntry style={{ flex: 1 }} value={password} onChangeText={(e) => setPassword(e)} />
                            </Container>
                        </Container>

                        <Container width="100%" height="15%" justifyContent="center" alignItems="flex-start" marginTop="20px" bgColor="white">
                            <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">Confirm Password</Text>
                            <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                                <Ionicons name="mail" size={25} color={theme.color} />
                                <TextInput secureTextEntry style={{ flex: 1 }} value={confirmPassword} onChangeText={(e) => setConfirmPassword(e)} />
                            </Container>
                        </Container>


                        <Pressable 
                        onPress={request}
                        style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: 60, backgroundColor: theme.primaryBackgroundColor, marginTop: 30, borderRadius: 10 }}>
                            {!loading && <Text color="white" fontSize="18px">Submit</Text>}
                            {loading && <ActivityIndicator color="white" size="small" /> }
                        </Pressable>


                    </Container>

                </ScrollView>
                
            </View>

        </View>
    )
}
