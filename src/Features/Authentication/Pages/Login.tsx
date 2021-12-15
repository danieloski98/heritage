import React from 'react'
import { View, TextInput, Pressable, ScrollView, ActivityIndicator, Alert, Platform, Image } from 'react-native'
import Button from '../../../globalcomponents/Button'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { theme } from '../../../utils/theme'
import { Ionicons } from '@expo/vector-icons'
import * as yup from 'yup'
import { useFormik } from 'formik'
import url from '../../../utils/url'
import { IReturnType } from '../../../Types/ReturnType'

// redux
import { RootState } from '../../../store'
import {updateUser, updateToken} from '../../../States/UserDetails'
import { useDispatch, useSelector } from 'react-redux'

// validationSchema
const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
})

export default function Login(props) {
    const [showing, setShowing] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

     // redux
    const user = useSelector((state: RootState) => state.userdetail);
    const dispatch = useDispatch();

    // formik
    const formik = useFormik({
        initialValues: {email: '', password: ''},
        validationSchema,
        onSubmit: () => {},
    });

    const submit = async () => {
        if (!formik.dirty) {
          Alert.alert('Message', 'Please Fill in the form', [
            { text: 'ok', style: "cancel", onPress: () => {}}
          ]);
          return;
        }
    
        if (!formik.isValid) {
          Alert.alert('Message', 'Please Fill in the form properly to continue', [
            { text: 'ok', style: "cancel", onPress: () => {}}
          ]);
          return;
        }
    
        setLoading(true);
    
        // make request
        const request = await fetch(`${url}auth/login`, {
          method: 'post',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(formik.values)
        });
    
        const json = await request.json() as IReturnType;
        setLoading(false);
        if (json.statusCode !== 200) {
          Alert.alert('Message', json.errorMessage, [
            {
              text: 'ok', style: 'cancel', onPress: () => {}
            }
          ]);
          return;
        }else {
          dispatch(updateUser(json.data.user));
          dispatch(updateToken(json.data.token));
    
          // console.log(user);
    
          Alert.alert('Message', json.successMessage, [
            {
              text: 'ok', style: 'cancel', onPress: () => {props.navigation.navigate('index')}
            }
          ]);
          formik.resetForm();
          return;
        }
        
      }


    return (
       <View style={{ flex: 1, backgroundColor: theme.darkBlue }}>

           <View style={{ flex: 0.15, backgroundColor: theme.darkBlue, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
               <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={{ fontWeight: Platform.OS === 'ios' ? '600':'bold', fontSize: 25, color: 'white' }}>Heritage</Text>
                    <Text style={{ fontWeight: '300', fontSize: 25, color: 'white', marginLeft: 5 }}>Exchange</Text>
               </View>
               <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Image source={require('../../../../assets/crypto/BTC.png')} resizeMode="contain" style={{ width: '30%', height: '100%', left: 100, bottom: -70, position: 'absolute' }} />
                    <Image source={require('../../../../assets/crypto/ETC.png')} resizeMode="contain" style={{ width: '40%', height: '100%', left: 50, bottom: -70, position: 'absolute' }} />
               </View>
           </View>

           <View style={{ flex: 0.85, borderTopLeftRadius: 30, overflow: 'hidden',  }}>

           <ScrollView style={{ flex: 1, backgroundColor: 'white', minHeight: theme.screenHeight,  borderTopLeftRadius: 30, overflow: 'hidden' }} contentContainerStyle={{ height: theme.screenHeight, overflow: 'hidden', borderTopLeftRadius: 30 }}>
           
            <View style={{ paddingHorizontal: 20, justifyContent: 'center', height: 100  }}>
                <Text color="black" fontSize="24px" fontWeight="bold">Glad  To See You Back</Text>
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">Sign In To Your Account To Continue</Text>
            </View>

            <View style={{ paddingHorizontal: 20, marginTop: 10, }}>

            <Container width="100%" height="18%" justifyContent="flex-start" alignItems="flex-start" marginTop="20px" bgColor="white">
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">Email</Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Ionicons name="mail" size={25} color={theme.color} />
                    <TextInput style={{ flex: 1, paddingHorizontal: 10 }} secureTextEntry={false} keyboardAppearance="light" keyboardType="email-address" value={formik.values.email} onChangeText={formik.handleChange('email')} onBlur={formik.handleBlur('email')} onFocus={() => formik.setFieldTouched('email', true, true)} />
                </Container>
                {formik.touched.email && formik.errors.email && (
                        <Text color="red" marginTop="3px">{formik.errors.email}</Text>
                    )}
            </Container>

                <Container width="100%" height="18%" justifyContent="flex-start" alignItems="flex-start" marginTop="10px" bgColor="white">
                    <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">Password</Text>
                    <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="50px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                        <Ionicons name="lock-closed" size={25} color={theme.color} />
                        <TextInput style={{ flex: 1, paddingHorizontal: 10 }} secureTextEntry={showing} value={formik.values.password} onChangeText={formik.handleChange('password')} onBlur={formik.handleBlur('password')} onFocus={() => formik.setFieldTouched('password', true, true)} />
                        <Pressable onPress={() => setShowing(prev => !prev)}>
                            {showing && <Ionicons name="eye" size={30} color={theme.color} />}
                            {!showing && <Ionicons name="eye-off" size={30} color={theme.color} />}
                        </Pressable>
                    </Container>
                    {formik.touched.password && formik.errors.password && (
                        <Text color="red" marginTop="3px">{formik.errors.password}</Text>
                    )}
                </Container>

             
                <Pressable style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: 60, backgroundColor: theme.primaryBackgroundColor, marginTop: 30, borderRadius: 10 }} onPress={submit}>
                            {!loading && <Text color="white" fontSize="18px">Sign in</Text>}
                            {loading && <ActivityIndicator color="white" size="small" /> }
                </Pressable>


                <Container width="100%" height="5%" alignItems="center" bgColor="white" marginTop="10px">
                    <Pressable
                        onPress={() => props.navigation.navigate('resetpassword')}
                    >
                        <Text textAlign="center" color={theme.primaryBackgroundColor} fontSize="16px" fontWeight="600">Forgot Password?</Text>
                    </Pressable>
                </Container>

                <Container width="100%" height="15%" justifyContent="center" alignItems="flex-end" flexDirection="row" bgColor="white">
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

            </View>

        </ScrollView>

           </View>

       </View>
    )
}
