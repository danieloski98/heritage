import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// components
import Login from '../Features/Authentication/Pages/Login';
import Signup from '../Features/Authentication/Pages/Signup';
import Verifyemail from '../Features/Authentication/Pages/Verifyemail';
import ResetPassword from '../Features/Authentication/Pages/ResetPassword';
import Home from '../Features/Authentication/Pages/Home';
import VerifyPin from '../Features/Authentication/Pages/Verifypin';



const Stack = createNativeStackNavigator();

export default function Authentication() {
    return (
        <Stack.Navigator initialRouteName="home" screenOptions={{ headerShown: false }} >
            <Stack.Screen name="home" component={Home}  />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="verifypin" component={VerifyPin} />
            <Stack.Screen name="verifyemail" component={Verifyemail} />
            <Stack.Screen name="resetpassword" component={ResetPassword} />
        </Stack.Navigator>
    )
}
