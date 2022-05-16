import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { theme } from '../../../utils/theme'
import SavingsCard from '../components/SavingsCard'
import SavingsTransactionCard from '../components/SavingsTransaction'
import TransactionCard from '../components/TransactionCard'
import LottieView from 'lottie-react-native';

export default function Savings() {
    return (
        <View style={{ flex: 1, backgroundColor: 'white', padding: 20, justifyContent: 'center', alignItems: 'center'  }}>

            <LottieView
                autoPlay
                loop
                speed={1}
                style={{
                    width: 100,
                    height: 250,
                    backgroundColor: 'white',
                }}
                source={require('../../../../assets/lottiefiles/70066-cryptocurrency-wallet.json')}
            />

            <Text fontSize="22px" color="grey" fontFamily="Inter-Bold" textAlign="center">Saving In Crypto, coming soon...</Text>

            {/* <Text fontSize="28px" fontFamily="Inter-Bold">Coming Soon</Text> */}
            {/* <ScrollView style={{ flex: 1}}> */}
                    {/* <Container width='100%' height="50px" alignItems="flex-start" marginTop="20px" paddingLeft="20px" paddingRight="20px" bgColor="white">
                        <Text color="black" fontWeight="bold" fontSize="20px" >Crypto Savings</Text>
                        <Text marginTop="16px" fontSize="16px" color="grey">Save money in cryptocurrency on Heritage Exchange</Text>
                    </Container> */}

                    {/* scrollview cards */}

                    {/* <Container width="100%" height="200px" alignItems="flex-start" paddingLeft="20px" marginTop="20px" bgColor="white">
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1 }} contentContainerStyle={{ alignItems: 'center' }}> */}
                            {/* <SavingsCard text1="BTC Value" prize="$34,000" text2="NGN: N12,000,000.00" />
                            <SavingsCard text1="Ethereum Value" prize="$139,000" text2="NGN: N12,000,000.00" /> */}
                            {/* <SavingsCard text1="USDT Value" prize="$1" text2="NGN: N550" />
                        </ScrollView>
                    </Container> */}

                    {/* history */}
                    {/* <View style={{ padding: 20 }}>
                        <Text color="black" fontWeight="bold" fontSize="20px">History</Text>

                        <View style={{ marginTop: 20 }}>
                            <SavingsTransactionCard />
                            <SavingsTransactionCard />
                            <SavingsTransactionCard />
                            <SavingsTransactionCard />
                            <SavingsTransactionCard />
                            <SavingsTransactionCard />
                        </View>
                    </View> */}

            {/* </ScrollView> */}
        </View>
    )
}
