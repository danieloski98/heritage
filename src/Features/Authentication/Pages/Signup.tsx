import React from "react";
import { View, Pressable, TextInput, Alert, ActivityIndicator } from "react-native";
import Button from "../../../globalcomponents/Button";
import Container from "../../../globalcomponents/Container";
import Text from "../../../globalcomponents/Text";
import { theme } from "../../../utils/theme";
import { ScrollView} from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'

// redux
import { RootState } from '../../../store'
import {updateUser, updateToken} from '../../../States/UserDetails'
import { useDispatch, useSelector } from 'react-redux'

// form 
import * as yup from 'yup'
import { useFormik } from 'formik'
import url from "../../../utils/url";
import { IReturnType } from "../../../Types/ReturnType";

// validationSchema
const validationSchema = yup.object({
  first_name: yup.string().required('This field is required'),
  last_name: yup.string().required('This field is required'),
  email: yup.string().email().required('This field is required'),
  phone: yup.string().required('This field is required'),
  referral_code: yup.string().required('This field is required'),
  password: yup.string().min(8, 'Minimium of 8 alpha-numeric characters').required('This field is required'),
})

export default function Signup(props: any) {
  const [showing, setShowing] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  // redux
  const user = useSelector((state: RootState) => state.userdetail);
  const dispatch = useDispatch();

  // formik
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      referral_code: '',
      password: '',
    },
    onSubmit: () => {},
    validationSchema,
  })

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
    const request = await fetch(`${url}auth/signup`, {
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
          text: 'ok', style: 'cancel', onPress: () => {}
        }
      ]);
      formik.resetForm();
      props.navigation.navigate('verifyemail')
      return;
    }
    
  }

  return (
    <View style={{ width: theme.screenWidth, backgroundColor: 'gold' }}>
      <ScrollView
        alwaysBounceVertical
        style={{
          backgroundColor: "white",
          paddingBottom: 100,
        }}
        contentContainerStyle={{
          paddingBottom: 150,
        }}
        horizontal={false}
        scrollEnabled
      >
        <Container
          width="100%"
          height="150px"
          bgColor="white"
          justifyContent="center"
          alignItems="flex-start"
          paddingLeft="20px"
          paddingRight="20px"
        >
          <Text fontWeight="bold" fontSize="30px" color="black">
            HX
          </Text>
        </Container>
        <Container
          width="100%"
          height="50px"
          bgColor="white"
          alignItems="flex-start"
          paddingLeft="20px"
          paddingRight="20px"
        >
          <Text color="black" fontSize="24px" fontWeight="bold">
            Create Your Account
          </Text>
          <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">
            Create Your Account To Continue
          </Text>
        </Container>

        <Container
          height={`${theme.screenWidth/100 * 190}px`}
          width="100%"
          justifyContent="flex-start"
          bgColor="white"
          paddingLeft="20px"
          paddingRight="20px"
          marginTop="20px"
        >
          <Container
            width="100%"
            height="60px"
            justifyContent="center"
            alignItems="flex-start"
            marginTop="30px"
            bgColor="white"
          >
            <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">
              Firstname
            </Text>
            <Container
              flexDirection="row"
              width="100%"
              borderRadius="5px"
              justifyContent="flex-start"
              alignItems="center"
              bgColor="#32797C1E"
              height="55px"
              marginTop="10px"
              paddingLeft="10px"
              paddingRight="10px"
            >
              <Ionicons name="person" size={30} color={theme.color} />
              <TextInput style={{ flex: 1 }} value={formik.values.first_name} onChangeText={formik.handleChange('first_name')} onBlur={formik.handleBlur('first_name')} onFocus={() => formik.setFieldTouched('first_name', true, true)} />
            </Container>
            {formik.touched.first_name && formik.errors.first_name && (
                <Text color="red" fontSize="14px" marginTop="3px">{formik.errors.first_name}</Text>
            )}
          </Container>

          <Container
            width="100%"
            height="60px"
            justifyContent="center"
            alignItems="flex-start"
            marginTop="40px"
            bgColor="white"
          >
            <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">
              Lastname
            </Text>
            <Container
              flexDirection="row"
              width="100%"
              borderRadius="5px"
              justifyContent="flex-start"
              alignItems="center"
              bgColor="#32797C1E"
              height="50px"
              marginTop="10px"
              paddingLeft="10px"
              paddingRight="10px"
            >
              <Ionicons name="person" size={30} color={theme.color} />
              <TextInput style={{ flex: 1 }} value={formik.values.last_name} onChangeText={formik.handleChange('last_name')} onBlur={formik.handleBlur('last_name')} onFocus={() => formik.setFieldTouched('last_name', true, true)} />
            </Container>
            {formik.touched.last_name && formik.errors.last_name && (
                <Text color="red" fontSize="14px" marginTop="3px">{formik.errors.last_name}</Text>
            )}
          </Container>

          <Container
            width="100%"
            height="60px"
            justifyContent="center"
            alignItems="flex-start"
            marginTop="40px"
            bgColor="white"
          >
            <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">
              Phone
            </Text>
            <Container
              flexDirection="row"
              width="100%"
              borderRadius="5px"
              justifyContent="flex-start"
              alignItems="center"
              bgColor="#32797C1E"
              height="50px"
              marginTop="10px"
              paddingLeft="10px"
              paddingRight="10px"
            >
              <Ionicons name="call" size={30} color={theme.color} />
              <TextInput style={{ flex: 1 }} value={formik.values.phone} onChangeText={formik.handleChange('phone')} onBlur={formik.handleBlur('phone')} onFocus={() => formik.setFieldTouched('phone', true, true)} />
            </Container>
            {formik.touched.phone && formik.errors.phone && (
                <Text color="red" fontSize="14px" marginTop="3px">{formik.errors.phone}</Text>
            )}
          </Container>

          <Container
            width="100%"
            height="60px"
            justifyContent="center"
            alignItems="flex-start"
            marginTop="35px"
            bgColor="white"
          >
            <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">
              Email
            </Text>
            <Container
              flexDirection="row"
              width="100%"
              borderRadius="5px"
              justifyContent="flex-start"
              alignItems="center"
              bgColor="#32797C1E"
              height="50px"
              marginTop="10px"
              paddingLeft="10px"
              paddingRight="10px"
            >
              <Ionicons name="mail" size={30} color={theme.color} />
              <TextInput style={{ flex: 1 }} value={formik.values.email} onChangeText={formik.handleChange('email')} onBlur={formik.handleBlur('email')} onFocus={() => formik.setFieldTouched('email', true, true)} />
            </Container>
            {formik.touched.email && formik.errors.email && (
                <Text color="red" fontSize="14px" marginTop="3px">{formik.errors.email}</Text>
            )}
          </Container>

          <Container
            width="100%"
            height="60px"
            justifyContent="center"
            alignItems="flex-start"
            marginTop="40px"
            bgColor="white"
          >
            <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">
              Password
            </Text>
            <Container
              flexDirection="row"
              width="100%"
              borderRadius="5px"
              justifyContent="flex-start"
              alignItems="center"
              bgColor="#32797C1E"
              height="50px"
              marginTop="10px"
              paddingLeft="10px"
              paddingRight="10px"
            >
              <Ionicons name="lock-closed" size={30} color={theme.color} />
              <TextInput style={{ flex: 1 }} secureTextEntry={showing} value={formik.values.password} onChangeText={formik.handleChange('password')} onBlur={formik.handleBlur('password')} onFocus={() => formik.setFieldTouched('password', true, true)} />
              <Pressable onPress={() => setShowing((prev) => !prev)}>
                <Text fontSize="18px" color="grey" fontWeight="bold">
                  {showing ? "SHOW" : "HIDE"}
                </Text>
              </Pressable>
            </Container>
            {formik.touched.password && formik.errors.password && (
                <Text color="red" fontSize="14px" marginTop="3px">{formik.errors.password}</Text>
            )}
          </Container>

          <Container
            width="100%"
            height="60px"
            justifyContent="center"
            alignItems="flex-start"
            marginTop="40px"
            bgColor="white"
          >
            <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">
              Referral Code
            </Text>
            <Container
              flexDirection="row"
              width="100%"
              borderRadius="5px"
              justifyContent="flex-start"
              alignItems="center"
              bgColor="#32797C1E"
              height="50px"
              marginTop="10px"
              paddingLeft="10px"
              paddingRight="10px"
            >
              <Ionicons name="person" size={30} color={theme.color} />
              <TextInput style={{ flex: 1 }} value={formik.values.referral_code} onChangeText={formik.handleChange('referral_code')} onBlur={formik.handleBlur('referral_code')} onFocus={() => formik.setFieldTouched('referral_code', true, true)} />
            </Container>
            {formik.touched.referral_code && formik.errors.referral_code && (
                <Text color="red" fontSize="14px" marginTop="3px">{formik.errors.referral_code}</Text>
            )}
          </Container>

          <Container
            width="100%"
            height="100px"
            justifyContent="flex-start"
            marginTop="50px"
            bgColor="white"
          >
           <Pressable
           onPress={() => submit()}
           style={{ width: '100%'}}
           >
            <Button>
                {loading && <ActivityIndicator size="small" color="white" /> }
                {!loading && <Text color="white">Create Account</Text> }
            </Button>
           </Pressable>
          </Container>

          <Container
            width="100%"
            height="40px"
            justifyContent="center"
            alignItems="flex-end"
            flexDirection="row"
            paddingBottom="10px"
            bgColor="white"
          >
            <Pressable
              onPress={() => props.navigation.navigate("resetpassword")}
            >
              <Text
                textAlign="center"
                color="grey"
                fontSize="16px"
                fontWeight="600"
              >
                Already Have An Account?
              </Text>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate("login")}>
              <Text
                textAlign="center"
                color={theme.primaryBackgroundColor}
                fontSize="16px"
                fontWeight="600"
              >
                {" "}
                Login
              </Text>
            </Pressable>
          </Container>
        </Container>
      </ScrollView>
    </View>
  );
}
