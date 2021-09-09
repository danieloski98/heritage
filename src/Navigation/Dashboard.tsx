import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Features/Dashboard/Pages/Home'
import Transactions from '../Features/Dashboard/Pages/Transactions'
import Savings from '../Features/Dashboard/Pages/Savings'
import Settings from '../Features/Dashboard/Pages/Settings'
import Navbar from '../Features/Dashboard/components/Navbar'
import { Feather } from '@expo/vector-icons'
import { theme } from '../utils/theme'

const Tab = createBottomTabNavigator()

export default function Dashboard() {
    return (
        <Tab.Navigator screenOptions={{ header: () => <Navbar /> }}  >

            <Tab.Screen name="dashboard" component={Home} options={{ title: 'Dashboard', tabBarIcon: ({ focused }) => <Feather name="pie-chart" size={25} color={focused ? theme.primaryBackgroundColor : theme.color } />}} />

            <Tab.Screen name="transactions" component={Transactions} options={{ title: 'Transaction',  tabBarIcon: ({ focused }) => <Feather name="grid" size={25} color={focused ? theme.primaryBackgroundColor : theme.color } />}} />

            <Tab.Screen name="savings" component={Savings} options={{ title: 'Savings', tabBarIcon: ({ focused }) => <Feather name="shield" size={25} color={focused ? theme.primaryBackgroundColor : theme.color } /> }} />

            <Tab.Screen name="settings" component={Settings} options={{ title: 'Settings', tabBarIcon: ({ focused }) => <Feather name="settings" size={25} color={focused ? theme.primaryBackgroundColor : theme.color } />}} />

        </Tab.Navigator>
    )
}
