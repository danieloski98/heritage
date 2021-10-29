import React from 'react'
import { View, TextInput, Pressable, ScrollView, ActivityIndicator, Alert } from 'react-native'
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
        <ScrollView style={{ flex: 1, backgroundColor: 'white', minHeight: theme.screenHeight }} contentContainerStyle={{ height: theme.screenHeight}}>
            <Container width="100%" height="20%" bgColor="white" justifyContent="center" alignItems="flex-start" paddingLeft="20px" paddingRight="20px">
                <Text fontWeight="bold" fontSize="30px" color="black">HX</Text>
            </Container>
            <Container width="100%" height="10%" bgColor="white" alignItems="flex-start" paddingLeft="20px" paddingRight="20px">
                <Text color="black" fontSize="24px" fontWeight="bold">Glad  To See You Back</Text>
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">Sign In To Your Account To Continue</Text>
            </Container>

            <Container height="70%" width="100%" justifyContent="flex-start" bgColor="white" paddingLeft="20px" paddingRight="20px" marginTop="20px">

            <Container width="100%" height="15%" justifyContent="center" alignItems="flex-start" marginTop="20px" bgColor="white">
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">Email</Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Ionicons name="mail" size={25} color={theme.color} />
                    <TextInput style={{ flex: 1, paddingHorizontal: 10 }} secureTextEntry={false} keyboardAppearance="light" keyboardType="email-address" value={formik.values.email} onChangeText={formik.handleChange('email')} onBlur={formik.handleBlur('email')} onFocus={() => formik.setFieldTouched('email', true, true)} />
                </Container>
                {formik.touched.email && formik.errors.email && (
                        <Text color="red" marginTop="3px">{formik.errors.email}</Text>
                    )}
            </Container>

                <Container width="100%" height="15%" justifyContent="center" alignItems="flex-start" marginTop="10px" bgColor="white">
                    <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">Password</Text>
                    <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="50px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                        <Ionicons name="lock-closed" size={25} color={theme.color} />
                        <TextInput style={{ flex: 1, paddingHorizontal: 10 }} secureTextEntry={showing} value={formik.values.password} onChangeText={formik.handleChange('password')} onBlur={formik.handleBlur('password')} onFocus={() => formik.setFieldTouched('password', true, true)} />
                        <Pressable onPress={() => setShowing(prev => !prev)}>
                            <Text fontSize="18px" color="grey" fontWeight="bold">
                                {showing ? 'SHOW':'HIDE'}
                            </Text>
                        </Pressable>
                    </Container>
                    {formik.touched.password && formik.errors.password && (
                        <Text color="red" marginTop="3px">{formik.errors.password}</Text>
                    )}
                </Container>

                <Container width="100%" height="10%" justifyContent="flex-start" marginTop="20px" bgColor="white">
                    <Button>
                        <Pressable style={{ flex: 1, justifyContent: 'center' }} onPress={submit}>
                            {!loading && <Text color="white">Sign in</Text>}
                            {loading && <ActivityIndicator color="white" size="small" /> }
                        </Pressable>
                    </Button>
                </Container>

                <Container width="100%" height="5%" alignItems="center" bgColor="white">
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

            </Container>

        </ScrollView>
    )
}
