import React from 'react'
import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

// components
import Login from '../Features/Authentication/Pages/Login';
import Signup from '../Features/Authentication/Pages/Signup';
import Verifyemail from '../Features/Authentication/Pages/Verifyemail';
import ResetPassword from '../Features/Authentication/Pages/ResetPassword';
import Home from '../Features/Authentication/Pages/Home';
import Dashboard from './Dashboard';
import Profile from '../Features/Dashboard/Pages/Profile';

const Stack = createNativeStackNavigator();

export default function Authentication() {
    return (
        <Stack.Navigator initialRouteName="home" screenOptions={{ headerShown: false }} >
            <Stack.Screen name="home" component={Home}  />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="verifyemail" component={Verifyemail} />
            <Stack.Screen name="resetpassword" component={ResetPassword} />
            <Stack.Screen name="index" component={Dashboard} />
            <Stack.Screen name="profile" component={Profile} />
        </Stack.Navigator>
    )
}
