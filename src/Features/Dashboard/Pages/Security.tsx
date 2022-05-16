import React from "react";
import { View, Pressable, TextInput , Alert, ActivityIndicator} from "react-native";
import Container from "../../../globalcomponents/Container";
import { theme } from "../../../utils/theme";
import Button from "../../../globalcomponents/Button";
import Text from "../../../globalcomponents/Text";
import { Feather, Ionicons } from "@expo/vector-icons";
import Navbar from "../components/Navbar";
import * as yup from 'yup'
import { useFormik } from 'formik'
import {useSelector} from 'react-redux'
import { RootState } from "../../../store";
import url from "../../../utils/url";
import { IReturnType } from "../../../Types/ReturnType";

const validationSchema = yup.object({
  oldpassword: yup.string().required().min(8),
  newpassword: yup.string().required().min(8)
});


export default function Security() {
    const [showing, setShowing] = React.useState(false);
    const [showing1, setShowing1] = React.useState(false);
    const [showing2, setShowing2] = React.useState(false);
    const [newpass, setNewPass] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const user = useSelector((state:RootState) => state.userdetail.user);

    const formik = useFormik({
      initialValues: {oldpassword: '', newpassword: ''},
      validationSchema,
      onSubmit: () => {},
    });

    const submit = async () => {
      if (!formik.dirty) {
        Alert.alert('Warning', 'Please fillin the form');
        return;
      }

      if (!formik.isValid) {
        Alert.alert('Warning', 'Please fillin the form properly');
        return;
      }

      if (newpass !== formik.values.newpassword) {
        Alert.alert('Warning', 'Passwords do not match');
        return;
      }

      // make request
      setLoading(true);
      const request = await fetch(`${url}auth/changepassword/${user._id}`, {
        method: 'put',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(formik.values),
      });

      const json = await request.json() as IReturnType;
      setLoading(false);
      if (json.statusCode !== 200) {
        Alert.alert('Error', json.errorMessage);
        return;
      } 
      Alert.alert('Success', json.successMessage);
      return;
      
    }

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
        <Navbar />
      <View style={{ paddingHorizontal: 20, paddingVertical: 20, backgroundColor: 'white' }}>
      <Text color="black" fontSize="23px" fontWeight="bold">
        Change Password
      </Text>

      <Container
        width="100%"
        height="15%"
        justifyContent="center"
        alignItems="flex-start"
        marginTop="30px"
        bgColor="white"
      >
        <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">
          Old Password
        </Text>
        <Container
          flexDirection="row"
          width="100%"
          borderRadius="5px"
          justifyContent="flex-start"
          alignItems="center"
          bgColor={theme.textInputBgColor}
          height="50px"
          marginTop="10px"
          paddingLeft="10px"
          paddingRight="10px"
        >
          <Ionicons name="lock-closed" size={25} color={theme.color} />
          <TextInput style={{ flex: 1 }} secureTextEntry={showing} value={formik.values.oldpassword} onChangeText={formik.handleChange('oldpassword')} onBlur={formik.handleBlur('oldpassword')} onFocus={() => formik.setFieldTouched('oldpassword', true, true)} />
          <Pressable onPress={() => setShowing((prev) => !prev)}>
            <Text fontSize="16px" color="grey" fontWeight="bold">
              {showing ? "SHOW" : "HIDE"}
            </Text>
          </Pressable>
        </Container>
        {formik.touched.oldpassword && formik.errors.oldpassword && (
          <Text color="red" marginTop="5px">{formik.errors.oldpassword}</Text>
        )}
      </Container>

      <Container
        width="100%"
        height="15%"
        justifyContent="center"
        alignItems="flex-start"
        marginTop="30px"
        bgColor="white"
      >
        <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">
          New Password
        </Text>
        <Container
          flexDirection="row"
          width="100%"
          borderRadius="5px"
          justifyContent="flex-start"
          alignItems="center"
          bgColor={theme.textInputBgColor}
          height="50px"
          marginTop="10px"
          paddingLeft="10px"
          paddingRight="10px"
        >
          <Ionicons name="lock-closed" size={25} color={theme.color} />
          <TextInput style={{ flex: 1 }} secureTextEntry={showing1} value={formik.values.newpassword} onChangeText={formik.handleChange('newpassword')} onBlur={formik.handleBlur('newpassword')} onFocus={() => formik.setFieldTouched('newpassword', true, true)} />
          <Pressable onPress={() => setShowing1((prev) => !prev)}>
            <Text fontSize="16px" color="grey" fontWeight="bold">
              {showing1 ? "SHOW" : "HIDE"}
            </Text>
          </Pressable>
        </Container>
        {formik.touched.newpassword && formik.errors.newpassword && (
          <Text color="red" marginTop="5px">{formik.errors.newpassword}</Text>
        )}
      </Container>

      <Container
        width="100%"
        height="15%"
        justifyContent="center"
        alignItems="flex-start"
        marginTop="30px"
        bgColor="white"
      >
        <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">
          Confirm Password
        </Text>
        <Container
          flexDirection="row"
          width="100%"
          borderRadius="5px"
          justifyContent="flex-start"
          alignItems="center"
          bgColor={theme.textInputBgColor}
          height="50px"
          marginTop="10px"
          paddingLeft="10px"
          paddingRight="10px"
        >
          <Ionicons name="lock-closed" size={25} color={theme.color} />
          <TextInput style={{ flex: 1 }} secureTextEntry={showing2} value={newpass} onChangeText={(e) => setNewPass(e)} />
          <Pressable onPress={() => setShowing2((prev) => !prev)}>
            <Text fontSize="16px" color="grey" fontWeight="bold">
              {showing2 ? "SHOW" : "HIDE"}
            </Text>
          </Pressable>
        </Container>
        {
          newpass !== '' && newpass !== formik.values.newpassword && (
            <Text color="red" marginTop="5px">Passwords do not match</Text>
          )
        }
      </Container>

      <Container width="50%" height="55px" marginTop="30px"  bgColor="white">
        <Button>
          <Pressable 
          onPress={submit}
          style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text color="white" fontSize="16px">
              {!loading && 'Update'}
              {loading && <ActivityIndicator color="white" />}
            </Text>
          </Pressable>
        </Button>
      </Container>
      </View>
    </View>
  );
}
