import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import Container from '../../Container';
import Button from '../../Button';
import { theme } from '../../../utils/theme';
import { currencyFormatterD, currencyFormatterNGN } from '../../../utils/currencyConverter'
import { IPaypoint } from '../../../Types/Paypoint';

// image links
const BTC = require('../../../../assets/crypto/BTC.png');
const ETH = require('../../../../assets/crypto/ETC.png');
const USDT = require('../../../../assets/crypto/USDC.png')

interface IProps {
    value: number, 
    amount: any, 
    nextStep: Function;
    getCoin: Function;
    paypoint: IPaypoint;
}

export default function BankDetails({value, amount, nextStep, getCoin, paypoint }: IProps) {

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

    const switchID = (): any => {
        if (value === 1) {
            return 'bitcoin';
        }else if (value === 2) {
            return 'ethereum';
        }else {
            return 'tether';
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, alignItems: 'center', height: 70 }}>
                <Image source={switchLogo()} resizeMode="contain" style={{ width: 60, height: 60 }} />
                <View style={{ marginLeft: 10}}>
                    <Text style={{ fontFamily: theme.fontFamily['Inter-Bold'] , fontSize: 24 }}>{amount} {switchText()}</Text>
                    <Text style={{ fontSize: 18, fontFamily: theme.fontFamily['Inter-Light']}}>
                    <Text style={{ fontFamily: theme.fontFamily['Inter-SemiBold']}}>NGN: </Text>
                    {amount <= 0 ? 0 : amount < 1 ? currencyFormatterNGN(getCoin(switchID()).current_price * amount * 550) : currencyFormatterNGN(getCoin(switchID()).current_price * amount * 550)}
                    </Text>
                </View>
            </View>

            <View style={{ marginTop: 30, height: 60 }}>
                <Text style={{ fontFamily: theme.fontFamily['Inter-SemiBold'] , fontSize: 18 }}>Payment Instructions</Text>
                <Text style={{ fontFamily: theme.fontFamily['Inter-Regular'] , fontSize: 16, marginTop: 5 }}>Send the above amount to the account below. </Text>
            </View>

            <View style={{ marginTop: 30, height: 100, }}>
                <Text style={{ fontSize: 18, fontFamily: theme.fontFamily['Inter-Regular'] }}>
                    <Text style={{ fontFamily: theme.fontFamily['Inter-SemiBold'] }}>Account Name :</Text> {paypoint.bank.account_name}
                </Text>
                <Text style={{ fontSize: 18, marginTop: 10, fontFamily: theme.fontFamily['Inter-Regular'] }}>
                    <Text style={{ fontFamily: theme.fontFamily['Inter-SemiBold'] }}>Account No. :</Text> {paypoint.bank.account_number}
                </Text>
                <Text style={{ fontSize: 18, marginTop: 10, fontFamily: theme.fontFamily['Inter-Regular'] }}>
                    <Text style={{ fontFamily: theme.fontFamily['Inter-SemiBold'] }}>Bank :</Text> {paypoint.bank.bank_name}
                </Text>
            </View>

            <Container width="100%" height="55px" alignItems="flex-start" marginTop="20px">
                    <Button>
                    <Pressable style={{ flex: 1, justifyContent: 'center', backgroundColor: theme.primaryBackgroundColor, width: '100%', borderRadius: 10, alignItems: 'center' }} onPress={() => nextStep(3)}>
                        <Text style={{ color: 'white', fontFamily: 'Inter-SemiBold'}}>Upload Payment Proof</Text>
                    </Pressable>
                    </Button>
                </Container>
        </View>
    )
}
