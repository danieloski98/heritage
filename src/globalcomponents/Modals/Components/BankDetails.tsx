import React from 'react'
import { View, Text, Image, Pressable, Alert } from 'react-native'
import Container from '../../Container';
import Button from '../../Button';
import { theme } from '../../../utils/theme';
import { currencyFormatterD, currencyFormatterNGN } from '../../../utils/currencyConverter'
import { IPaypoint } from '../../../Types/Paypoint';
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard';
import Snackbar from 'react-native-snackbar-component'

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
    action: number;
}

export default function BankDetails({value, amount, nextStep, getCoin, paypoint, action }: IProps) {
    const [showSnack, setShowSnack] = React.useState(false);

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

    const copy = () => {
        Clipboard.setString(paypoint.bank.account_number);
        setShowSnack(true);
        Alert.alert('Action', `Account number copied`);
    }

    const close = async () => {
        const text = await Clipboard.getStringAsync();
        setShowSnack(false);
    }

    return (
        <View style={{ flex: 1 }}>
             <Snackbar visible={showSnack} textMessage={`Account number copied`} actionHandler={close} actionText="close"/>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, alignItems: 'center', height: 70 }}>
                <Image source={switchLogo()} resizeMode="contain" style={{ width: 60, height: 60 }} />
                <View style={{ marginLeft: 10}}>
                    <Text style={{ fontFamily: theme.fontFamily['Inter-Bold'] , fontSize: 24 }}>{(amount/ getCoin(switchID()).current_price).toFixed(6)} {switchText()}</Text>
                    <Text style={{ fontSize: 18, fontFamily: theme.fontFamily['Inter-Light']}}>
                    <Text style={{ fontFamily: theme.fontFamily['Inter-SemiBold']}}>NGN: </Text>
                    {currencyFormatterNGN(amount * (action === 1 ? (paypoint.buy_rate):(paypoint.sell_rate)))}
                    {/* {amount <= 0 ? 0 : amount < 1 ? currencyFormatterNGN(getCoin(switchID()).current_price * amount * paypoint.buy_rate) : currencyFormatterNGN(getCoin(switchID()).current_price * amount * 550)} */}
                    </Text>
                </View>
            </View>

            <View style={{ marginTop: 30, height: 60 }}>
                <Text style={{ fontFamily: theme.fontFamily['Inter-SemiBold'] , fontSize: 18 }}>Payment Instructions</Text>
                <Text style={{ fontFamily: theme.fontFamily['Inter-Regular'] , fontSize: 16, marginTop: 5 }}>Send the above amount in (NGN) to the account below. </Text>
            </View>

            <View style={{ marginTop: 30, height: 100, }}>
                <Text style={{ fontSize: 18, fontFamily: theme.fontFamily['Inter-Regular'] }}>
                    <Text style={{ fontFamily: theme.fontFamily['Inter-SemiBold'] }}>Account Name :</Text> {paypoint.bank.account_name}
                </Text>
                <View style={{ flexDirection: 'row'}}>
                    <Text style={{ fontSize: 18, marginTop: 10, fontFamily: theme.fontFamily['Inter-Regular'] }}>
                        <Text style={{ fontFamily: theme.fontFamily['Inter-SemiBold'] }}>Account No. :</Text> {paypoint.bank.account_number}
                    </Text>
                    <Ionicons name="copy" size={30} color={theme.color} style={{ marginLeft: 10 }} onPress={copy} />
                </View>
                <Text style={{ fontSize: 18, marginTop: 10, fontFamily: theme.fontFamily['Inter-Regular'] }}>
                    <Text style={{ fontFamily: theme.fontFamily['Inter-SemiBold'] }}>Bank :</Text> {paypoint.bank.bank_name}
                </Text>
            </View>

            <Text style={{ color: 'red', fontFamily: theme.fontFamily['Inter-Medium'], fontSize: 14 }}>Disclaimer: when sending funds do not include anything related to cryptocurrency(btc, eth, usdt) in the reference note, doing so might result in the restriction of your bank account.</Text>

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
