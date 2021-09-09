import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Authentication from './Authentication'
import Dashboard from './Dashboard'

export default function Index() {
    return (
        <NavigationContainer>
            <Authentication />
        </NavigationContainer>
    )
}
