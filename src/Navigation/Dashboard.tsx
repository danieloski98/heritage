import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Features/Dashboard/Pages/Home'
import Transactions from '../Features/Dashboard/Pages/Transactions'
import Savings from '../Features/Dashboard/Pages/Savings'
import Settings from '../Features/Dashboard/Pages/Settings'
import Navbar from '../Features/Dashboard/components/Navbar'
import { Feather, FontAwesome5 } from '@expo/vector-icons'
import { Platform, StyleSheet, Text, View } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, } from 'react-native-reanimated'
import { theme } from '../utils/theme';

const os = Platform.OS;

const Tab = createBottomTabNavigator()

export default function Dashboard() {
  
    return (
        <>

        {/* tabs */}

        <Tab.Navigator screenOptions={{ header: ({route}) => route.name === 'settings' ? <></> : <Navbar />, tabBarStyle: { height: os === 'ios' ? 80:65, paddingBottom: os === 'ios' ? 20:10 }, tabBarLabelStyle: { fontWeight: '600', includeFontPadding: true, fontSize: 12} }}  >

            <Tab.Screen name="dashboard" component={Home} options={{ title: 'Dashboard', tabBarIcon: ({ focused }) => <FontAwesome5 name="chart-pie" size={25} color={focused ? theme.darkBlue : theme.color } />}} />

            <Tab.Screen name="transactions" component={Transactions} options={{ title: 'Transaction',  tabBarIcon: ({ focused }) => <FontAwesome5 name="th-large" size={25} color={focused ? theme.darkBlue : theme.color } />}} />

            <Tab.Screen name="savings" component={Savings} options={{ title: 'Savings', tabBarIcon: ({ focused }) => <FontAwesome5 name="piggy-bank" size={25} color={focused ? theme.darkBlue : theme.color } /> }} />

            <Tab.Screen name="settings" component={Settings} options={{ title: 'Settings', tabBarIcon: ({ focused }) => <FontAwesome5 name="cog" size={25} color={focused ? theme.darkBlue : theme.color } />}} />

        </Tab.Navigator>
    </>
    )
}
