import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import { QRCode } from 'react-native-custom-qr-codes-expo';
import { theme } from '../../../utils/theme';
import { Ionicons } from '@expo/vector-icons'
import Container from '../../Container';
import Button from '../../Button';
import { View as MotiView } from 'moti'

// image links
const BTC = require('../../../../assets/icons/btc.png');
const ETH = require('../../../../assets/icons/eth.png');
const USDT = require('../../../../assets/icons/tether.png')

export default function QRcode() {
    return (
        <MotiView 
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing' }} 
        style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, alignItems: 'center', height: 70 }}>
                <Image source={ETH} resizeMode="contain" style={{ width: 60, height: 60 }} />
                <View style={{ marginLeft: 10}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 24 }}>1.0 ETH</Text>
                    <Text style={{ fontSize: 18}}>NGN: 13,002,382</Text>
                </View>
            </View>

            <View style={{ width: '100%', height: 80, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Payment Instructions</Text>
                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '400' }}>Send crypto by scanning or copying the wallet address below</Text>
            </View>

            <View style={{ width: '100%', height: 100, alignItems: 'center'}}>
                <QRCode content='https://reactnative.com' size={100} />
            </View>

            <View style={{ width: '100%', height: 80, justifyContent: 'center', paddingHorizontal: 10 }}>
                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Address</Text>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', marginTop: 10 }}>
                    <Text selectable selectionColor={theme.color} textBreakStrategy="highQuality" style={{ textAlign: 'center', fontSize: 16, fontWeight: '400', width: '90%' }}>0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7</Text>
                    <Ionicons name="copy" size={30} color={theme.color} style={{ marginLeft: 10 }} onPress={() => alert('Address copied')} />
                </View>
            </View>

            <Container width="100%" height="55px" alignItems="flex-start" marginTop="20px">
                    <Button>
                        <Pressable onPress={() => alert('pressed')}>
                            <Text style={{ color: 'white' }}>Upload Payment Proof</Text>
                        </Pressable>
                    </Button>
            </Container>
        </MotiView>
    )
}
