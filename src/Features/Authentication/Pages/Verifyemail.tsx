import React from 'react'
import { TextInput, Pressable, ScrollView, Alert, ActivityIndicator } from 'react-native'
import Button from '../../../globalcomponents/Button'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { theme } from '../../../utils/theme'
import { Feather, Ionicons } from '@expo/vector-icons'
import * as yup from 'yup'
import { Formik, useFormik } from 'formik'
import { IReturnType } from '../../../Types/ReturnType'
import url from '../../../utils/url'

// validationSchema
const validationSchema = yup.object({
    code: yup.string().max(4).required(),
})

export default function Verifyemail(props: any) {
    // states
    const [loading, setLoading] = React.useState(false);

    // formik
    const formik = useFormik({
        initialValues: {code: ''},
        validationSchema,
        onSubmit: () => {},
    })

    const submit = async () => {
        if(!formik.dirty) {
            Alert.alert('Message', 'Please provide the code sent to your email');
            return;
        }

        setLoading(true);

        // make request
        const request = await fetch(`${url}auth/verify/${formik.values.code}`, {
            method: 'get',
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
        
        Alert.alert('Message', json.successMessage, [
            {
            text: 'ok', style: 'cancel', onPress: () => {}
            }
        ]);
        formik.resetForm();
        props.navigation.navigate('pin');
        return;
        }
        
    }
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
                    <TextInput style={{ flex: 1 }} value={formik.values.code} onChangeText={formik.handleChange('code')} onBlur={formik.handleBlur('code')} onFocus={() => formik.setFieldTouched('code', true, true)} keyboardType="number-pad" />
                </Container>
                    {formik.touched.code && formik.errors.code && (
                        <Text color="red" marginTop="3px" fontSize="12px">{formik.errors.code}</Text>
                    )}
            </Container>


            <Container width="100%" height="10%" justifyContent="flex-start" marginTop="20px" bgColor="white" >
                <Button>
                   <Pressable onPress={submit}>
                    {!loading && (
                            <Text color="white">Verify Email Address</Text>
                    )}
                    {loading && (
                            <ActivityIndicator size="small" color="white" />
                    )}
                   </Pressable>
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
