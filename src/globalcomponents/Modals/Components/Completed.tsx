import React from 'react'
import { View, Text, Platform } from 'react-native'
import LottieView from 'lottie-react-native';


export default function Completed() {
    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 50 }}>
            <LottieView
                autoPlay
                loop
                speed={1}
                style={{
                    width: 200,
                    height: 200,
                    backgroundColor: 'white',
                }}
                source={require('../../../../assets/lottiefiles/success2.json')}
            />
            <Text style={{ textAlign: 'center', fontSize: Platform.OS === 'ios' ? 14:16, marginTop: 20 }}>
            Thank your for your transaction. Your transaction is being processed.  once processing is complete. This typically takes a couple of minutes
            </Text>
        </View>
    )
}
