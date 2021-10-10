import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import Container from '../../Container';
import Button from '../../Button';
import { theme } from '../../../utils/theme';

// image links
const BTC = require('../../../../assets/icons/btc.png');
const ETH = require('../../../../assets/icons/eth.png');
const USDT = require('../../../../assets/icons/tether.png')

interface IProps {
    value: number, 
    amount: string, 
    nextStep: Function;
}

export default function BankDetails({value, amount, nextStep}: IProps) {

    const switchLogo = (): any => {
        if (value === 1) {
            return BTC;
        }else if (value === 2) {
            return ETH;
        }else {
            return USDT;
        }
    }

    const switchText = (): any => {
        if (value === 1) {
            return 'BTC';
        }else if (value === 2) {
            return 'ETH';
        }else {
            return 'USDT';
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, alignItems: 'center', height: 70 }}>
                <Image source={switchLogo()} resizeMode="contain" style={{ width: 60, height: 60 }} />
                <View style={{ marginLeft: 10}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{amount} {switchText()}</Text>
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
                    <Pressable style={{ flex: 1, justifyContent: 'center', backgroundColor: theme.primaryBackgroundColor, width: '100%', borderRadius: 10, alignItems: 'center' }} onPress={() => nextStep(3)}>
                        <Text style={{ color: 'white'}}>Upload Payment Proof</Text>
                    </Pressable>
                    </Button>
                </Container>
        </View>
    )
}
