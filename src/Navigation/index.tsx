import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Authentication from './Authentication'

export default function Index() {
    return (
        <NavigationContainer>
            <Authentication />
        </NavigationContainer>
    )
}
