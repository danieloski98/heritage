import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { theme } from '../../../utils/theme'
import SavingsCard from '../components/SavingsCard'
import SavingsTransactionCard from '../components/SavingsTransaction'
import TransactionCard from '../components/TransactionCard'

export default function Savings() {
    return (
        <View style={{ flex: 1, backgroundColor: theme.light }}>
            <ScrollView style={{ flex: 1}}>
                    <Container width='100%' height="50px" alignItems="flex-start" marginTop="20px" paddingLeft="20px" paddingRight="20px" bgColor={theme.light}>
                        <Text color="black" fontWeight="bold" fontSize="20px" >Crypto Savings</Text>
                        <Text marginTop="16px" fontSize="16px" color="grey">Save money in cryptocurrency on Heritage Exchange</Text>
                    </Container>

                    {/* scrollview cards */}

                    <Container width="100%" height="200px" alignItems="flex-start" paddingLeft="20px" marginTop="20px" bgColor={theme.light}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1 }} contentContainerStyle={{ alignItems: 'center' }}>
                            <SavingsCard text1="BTC Value" prize="$34,000" text2="NGN: N12,000,000.00" />
                            <SavingsCard text1="Ethereum Value" prize="$139,000" text2="NGN: N12,000,000.00" />
                            <SavingsCard text1="USDT Value" prize="$1" text2="NGN: N550" />
                        </ScrollView>
                    </Container>

                    {/* history */}
                    <View style={{ padding: 20 }}>
                        <Text color="black" fontWeight="bold" fontSize="20px">History</Text>

                        <View style={{ marginTop: 20 }}>
                            <SavingsTransactionCard />
                            <SavingsTransactionCard />
                            <SavingsTransactionCard />
                            <SavingsTransactionCard />
                            <SavingsTransactionCard />
                            <SavingsTransactionCard />
                        </View>
                    </View>

            </ScrollView>
        </View>
    )
}
