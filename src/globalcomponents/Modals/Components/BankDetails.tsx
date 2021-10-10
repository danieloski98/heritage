import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import Container from '../../Container';
import Button from '../../Button';

// image links
const BTC = require('../../../../assets/icons/btc.png');
const ETH = require('../../../../assets/icons/eth.png');
const USDT = require('../../../../assets/icons/tether.png')

export default function BankDetails() {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, alignItems: 'center', height: 70 }}>
                <Image source={ETH} resizeMode="contain" style={{ width: 60, height: 60 }} />
                <View style={{ marginLeft: 10}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 24 }}>1.0 ETH</Text>
                    <Text style={{ fontSize: 18}}>NGN: 13,002,382</Text>
                </View>
            </View>

            <View style={{ marginTop: 30, height: 60 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Payment Instructions</Text>
                <Text style={{ fontWeight: '300', fontSize: 16, marginTop: 5 }}>Send money to the account below and use the transaction reference </Text>
            </View>

            <View style={{ marginTop: 30, height: 100, }}>
                <Text style={{ fontSize: 18 }}>
                    <Text style={{ fontWeight: 'bold'}}>Account Name :</Text> Heritage Exchange
                </Text>
                <Text style={{ fontSize: 18, marginTop: 10 }}>
                    <Text style={{ fontWeight: 'bold'}}>Account No. :</Text> 0292930922
                </Text>
                <Text style={{ fontSize: 18, marginTop: 10 }}>
                    <Text style={{ fontWeight: 'bold'}}>Bank :</Text> Heritage Bank
                </Text>
            </View>

            <Container width="100%" height="55px" alignItems="flex-start" marginTop="20px">
                    <Button>
                        <Pressable onPress={() => alert('pressed')}>
                            <Text style={{ color: 'white'}}>Upload Payment Proof</Text>
                        </Pressable>
                    </Button>
                </Container>
        </View>
    )
}
