import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import Navbar from '../components/Navbar'
import WalletsBanks from '../components/WalletsBanks'

export default function Wallets() {
    return (
        <View>
            <Navbar />
            <ScrollView>
                <WalletsBanks />
            </ScrollView>
        </View>
    )
}
