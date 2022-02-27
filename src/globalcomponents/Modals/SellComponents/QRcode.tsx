import React from 'react'
import { View, Text, Image, Pressable, Alert } from 'react-native'
import { QRCode } from 'react-native-custom-qr-codes-expo';
import { theme } from '../../../utils/theme';
import { Ionicons } from '@expo/vector-icons'
import Container from '../../Container';
import Button from '../../Button';
import { View as MotiView } from 'moti'
import { IPaypoint } from '../../../Types/Paypoint';
import { currencyFormatterNGN } from '../../../utils/currencyConverter';
import Snackbar from 'react-native-snackbar-component'
import * as Clipboard from 'expo-clipboard';

// image links
const BTC = require('../../../../assets/icons/btc.png');
const ETH = require('../../../../assets/icons/eth.png');
const USDT = require('../../../../assets/icons/tether.png');


interface IProps {
    value?: number, 
    amount?: any, 
    nextStep: Function;
    getCoin: Function;
    paypoint: IPaypoint;
    action: number;
}

export default function QRcode({ nextStep, amount, value, getCoin, paypoint, action }: IProps) {
    const [showSnack, setShowSnack] = React.useState(false);
    const switchID = (): any => {
        if (value === 1) {
            return 'bitcoin';
        }else if (value === 2) {
            return 'ethereum';
        }else {
            return 'tether';
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

    const switchWallet = (): string => {
        if (value === 1) {
            return paypoint.bitcoin_wallet;
        }else if (value === 2) {
            return paypoint.etheruem_wallet;
        }else {
            return paypoint.usdt_wallet;
        }
    }

    const copy = () => {
        Clipboard.setString(switchWallet());
        setShowSnack(true);
        Alert.alert('Action', `${switchID()} wallet address copied`);
    }

    const close = async () => {
        const text = await Clipboard.getStringAsync();
        console.log(text);
        setShowSnack(false);
    }
    
    return (
        <MotiView 
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing' }} 
        style={{ flex: 1 }}>
            <Snackbar visible={showSnack} textMessage={`${switchID()} wallet address copied`} actionHandler={close} actionText="close"/>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, alignItems: 'center', height: 70 }}>
                <Image source={ETH} resizeMode="contain" style={{ width: 60, height: 60 }} />
                <View style={{ marginLeft: 10}}>
                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{(amount/ getCoin(switchID()).current_price).toFixed(6)} {switchText()}</Text>
                    <Text style={{ fontSize: 18, fontFamily: 'Inter-Regular' }}>
                    <Text style={{ fontFamily: 'Inter-SemiBold', marginRight: 10 }}>NGN: </Text> 
                    {currencyFormatterNGN(amount * (action === 1 ? (paypoint.buy_rate):(paypoint.sell_rate)))}
                    {/* {currencyFormatterNGN(amount <= 0 ? 0 : amount < 1 ? Math.fround((Math.round(getCoin(switchID()).current_price) * amount) * paypoint.rate) : getCoin(switchID()).current_price * amount * paypoint.rate)} */}
                </Text>
                </View>
            </View>

            <View style={{ width: '100%', height: 80, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 18, fontFamily: 'Inter-SemiBold' }}>Payment Instructions</Text>
                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '400', fontFamily: 'Inter-Regular' }}>Send crypto by scanning or copying the wallet address below</Text>
            </View>

            <View style={{ width: '100%', height: 100, alignItems: 'center'}}>
                <QRCode content={switchWallet()} size={100} />
            </View>

            <View style={{ width: '100%', height: 80, justifyContent: 'center', paddingHorizontal: 10 }}>
                <Text style={{ textAlign: 'center', fontSize: 16, fontFamily: 'Inter-SemiBold' }}>Address</Text>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', marginTop: 10 }}>
                    <Text selectable selectionColor={theme.color} textBreakStrategy="highQuality" style={{ textAlign: 'center', fontSize: 16, fontFamily: 'Inter-SemiBold', width: '90%' }}>{switchWallet()}</Text>
                    <Ionicons name="copy" size={30} color={theme.color} style={{ marginLeft: 10 }} onPress={copy} />
                </View>
            </View>

            <Container width="100%" height="55px" alignItems="flex-start" marginTop="20px">
                    <Button>
                        <Pressable onPress={() => nextStep(3)}>
                            <Text style={{ color: 'white', fontFamily: 'Inter-SemiBold' }}>Upload Payment Proof</Text>
                        </Pressable>
                    </Button>
            </Container>
        </MotiView>
    )
}
