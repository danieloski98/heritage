import React, { useState } from 'react'
import { View, Pressable, Image, TextInput, Platform } from 'react-native'
import Container from '../../Container';
import Button from '../../Button';
import Text from '../../Text';
import DropDownPicker from 'react-native-dropdown-picker';
import { theme } from '../../../utils/theme';
import { currencyFormatterD, currencyFormatterNGN } from '../../../utils/currencyConverter'

// redux
import {useSelector} from 'react-redux'
import {RootState} from '../../../store/index'
import { IPaypoint } from '../../../Types/Paypoint';

// image links
const BTC = require('../../../../assets/crypto/BTC.png');
const ETH = require('../../../../assets/crypto/ETC.png');
const USDT = require('../../../../assets/crypto/USDC.png')

interface IProps {
    value: number, 
    setValue: any, 
    amount: any, 
    setAmount: Function;
    nextStep: Function;
    getCoin: Function;
    opener: number;
    paypoint: IPaypoint;
    action: number;
}


export default function SetAmount({value, setValue, amount, setAmount, nextStep, getCoin, opener, paypoint, action}: IProps) {


    const [open, setOpen] = useState(false);
    
    const [items, setItems] = useState([
        {label: 'BTC', value: 1},
        {label: 'ETH', value: 2},
        {label: 'USDT', value: 3},
    ]);

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

            <View style={{ width: '100%', height: 70, marginTop: 40, alignItems: 'center' }}>
                <Image source={switchLogo()} resizeMode="contain" style={{ width: 60, height: 60 }} />
            </View>

            <View style={{ width: '100%', marginTop: 20,  height: 100, zIndex: 2 }}>
                <Text color="grey" fontSize="16px" fontFamily={theme.fontFamily['Inter-SemiBold']}>Amount in Dollar</Text>
                <View style={{ marginTop: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput keyboardType="numbers-and-punctuation" value={amount} onChangeText={(val) => setAmount(val)} style={{ width: '100%', height: 50, borderRadius: 10, borderWidth: 2, borderColor: 'lightgrey', paddingHorizontal: 20, backgroundColor: '#E4E9F2', }} />
                    {/* <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        containerStyle={{ width: '30%', marginLeft: 5,  }}
                        style={{ borderWidth: 2, borderColor: 'lightgrey', backgroundColor: '#E4E9F2', zIndex: 2 }}
                        scrollViewProps={{ style: { borderWidth: 2, borderColor: 'lightgrey', }}}
                    /> */}
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 10, flexWrap: 'wrap', marginBottom: 20 }}>

                <Text style={{ fontWeight: Platform.OS === 'ios'? '300':'300', fontSize: 18, color: 'black', flex: 1, }}>
                <Text style={{ fontSize: 18, color: 'black', fontFamily: theme.fontFamily['Inter-SemiBold'] }}>NGN: </Text>
                {currencyFormatterNGN(amount * (action === 1 ? (paypoint.buy_rate):(paypoint.sell_rate)))}
                    {/* {amount <= 0 ? 0 : amount < 1 ? currencyFormatterNGN(getCoin(switchID()).current_price * amount * (action === 1 ? (paypoint?.buy_rate as number): (paypoint?.sell_rate as number))) : currencyFormatterNGN(getCoin(switchID()).current_price * amount * action === 1 ? (paypoint?.buy_rate as number): (paypoint?.sell_rate as number))} */}
                </Text>

                <Text style={{ flex: 1 }}>
                    <Text style={{ fontFamily: theme.fontFamily['Inter-SemiBold'] , fontSize: 18, color: 'black' }}>{switchID()}: </Text>
                    <Text style={{ fontFamily: theme.fontFamily['Inter-Light'], fontSize: 18, color: 'black', }}>{(amount / getCoin(switchID()).current_price).toFixed(6)}</Text>
                    {/* <Text style={{ fontFamily: theme.fontFamily['Inter-Light'], fontSize: 18, color: 'black', }}>{amount <= 0 ? 0 : currencyFormatterD(getCoin(switchID()).current_price * amount)}</Text> */}
                </Text>
                    
            </View>
       
            <Container width="100%" height="55px" alignItems="flex-start" marginTop="10px">
                <Button>
                    <Pressable style={{ flex: 1, justifyContent: 'center', backgroundColor: theme.primaryBackgroundColor, width: '100%', borderRadius: 10, alignItems: 'center' }} onPress={() => nextStep(2)}>
                        <Text fontFamily={theme.fontFamily['Inter-Medium']} color="white">{`${opener === 1 ? 'Buy':'Sell'} ${(amount / getCoin(switchID()).current_price).toFixed(6)} ${switchText()}`}</Text>
                    </Pressable>
                </Button>
            </Container>
        </View>
    )
}
