import React from 'react'
import { View, TextInput, Pressable, ActivityIndicator, Alert } from 'react-native'
import Button from '../../../globalcomponents/Button'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { theme } from '../../../utils/theme'
import { Feather, Ionicons } from '@expo/vector-icons'
import * as yup from 'yup';
import { useFormik } from 'formik'
import { queryClient } from '../../../../App'

const validationSchema = yup.object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    phone: yup.string().required(),
})

// redux
import { RootState } from '../../../store'
import { useSelector } from 'react-redux'
import { updateUser } from '../../../States/UserDetails'
import url from '../../../utils/url'
import { IReturnType } from '../../../Types/ReturnType'

export default function PersonalInfoForm() {
    const [showing, setShowing] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    // redux
    const user = useSelector((state: RootState) => state.userdetail.user);
    const token = useSelector((state: RootState) => state.userdetail.token);

    // formik
    const formik = useFormik({
        initialValues: {first_name: user.first_name, last_name: user.last_name, phone: user.phone },
        onSubmit: () => {},
        validationSchema,
    })

    const submit = async () => {
        if (!formik.dirty) {
          Alert.alert('Message', 'Make a change first', [
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
        const request = await fetch(`${url}user/edit/names/${user._id}`, {
          method: 'put',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`
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
            queryClient.invalidateQueries();
        //   dispatch(updateUser(json.data.user));
        //   dispatch(updateToken(json.data.token));
    
          // console.log(user);
    
          Alert.alert('Message', json.successMessage, [
            {
              text: 'ok', style: 'cancel', onPress: () => {}
            }
          ]);
          formik.resetForm();
          return;
        }
        
      }
    

    return (
        <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 30, backgroundColor: 'white' }}>

            <Container width="100%" height="15%" justifyContent="center" alignItems="flex-start" marginTop="10px" bgColor="white">
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">Firstname</Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Ionicons name="person" size={25} color={theme.color} />
                    <TextInput style={{ flex: 1, paddingHorizontal: 10 }} secureTextEntry={showing} value={formik.values.first_name} onChangeText={formik.handleChange('first_name')} onBlur={formik.handleBlur('first_name')} onFocus={() => formik.setFieldTouched('first_name', true, true)} />
                </Container>
            </Container>

            <Container width="100%" height="15%" justifyContent="center" alignItems="flex-start" marginTop="40px" bgColor="white">
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">Lastname</Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Ionicons name="person" size={25} color={theme.color} />
                    <TextInput style={{ flex: 1, paddingHorizontal: 10 }} secureTextEntry={showing} value={formik.values.last_name} onChangeText={formik.handleChange('last_name')} onBlur={formik.handleBlur('last_name')} onFocus={() => formik.setFieldTouched('last_name', true, true)} />
                </Container>
            </Container>

            {/* <Container width="100%" height="15%" justifyContent="center" alignItems="flex-start" marginTop="20px" bgColor={theme.light}>
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">Email</Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Ionicons name="mail" size={25} color={theme.color} />
                    <TextInput style={{ flex: 1, paddingHorizontal: 10 }} secureTextEntry={showing} value={user.email} />
                </Container>
            </Container> */}

            <Container width="100%" height="15%" justifyContent="center" alignItems="flex-start" marginTop="40px" bgColor="white">
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">Phone</Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Ionicons name="call" size={25} color={theme.color} />
                    <TextInput style={{ flex: 1, paddingHorizontal: 10 }} value={formik.values.phone} onChangeText={formik.handleChange('phone')} onBlur={formik.handleBlur('phone')} onFocus={() => formik.setFieldTouched('phone', true, true)} />
                </Container>
            </Container>

            <Container width="50%" height="55px" marginTop="40px">
                <Button>
                    <Pressable style={{ flex: 1, justifyContent: 'center' }} onPress={submit}>
                        {!loading && <Text color="white">update</Text>}
                        {loading && <ActivityIndicator color="white" size="small" /> }
                    </Pressable>
                </Button>
            </Container>
    </View>
    )
}
