import React, { useState } from 'react'
import { View, Pressable, Image, TextInput } from 'react-native'
import Container from '../../Container';
import Button from '../../Button';
import Text from '../../Text';
import DropDownPicker from 'react-native-dropdown-picker';
import { theme } from '../../../utils/theme';

// image links
const BTC = require('../../../../assets/icons/btc.png');
const ETH = require('../../../../assets/icons/eth.png');
const USDT = require('../../../../assets/icons/tether.png')

interface IProps {
    value: number, 
    setValue: any, 
    amount: any, 
    setAmount: Function;
    nextStep: Function;
    getCoin: Function;
}


export default function SetAmount({value, setValue, amount, setAmount, nextStep, getCoin}: IProps) {


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
                <Text color="grey" fontSize="16px" fontWeight="bold">Amount</Text>
                <View style={{ marginTop: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput keyboardType="number-pad" value={amount} onChangeText={(val) => setAmount(val)} style={{ width: '65%', height: 50, borderRadius: 10, borderWidth: 2, borderColor: 'lightgrey', paddingHorizontal: 20, backgroundColor: '#E4E9F2', }} />
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        containerStyle={{ width: '30%', marginLeft: 5,  }}
                        style={{ borderWidth: 2, borderColor: 'lightgrey', backgroundColor: '#E4E9F2', zIndex: 2 }}
                        scrollViewProps={{ style: { borderWidth: 2, borderColor: 'lightgrey', }}}
                    />
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 10, flexWrap: 'wrap', marginBottom: 20 }}>
                <Text style={{ fontWeight: '600', fontSize: 18, color: 'black', flex: 0.6 }}>NGN: {amount <= 0 ? 0 : amount < 1 ? Math.fround((Math.round(getCoin(switchID()).current_price) * amount) * 550) : getCoin(switchID()).current_price * amount * 550}</Text>
                <Text style={{ fontWeight: '600', fontSize: 18, color: 'black', flex: 0.3,  }}>USD: {amount <= 0 ? 0 : Math.round(getCoin(switchID()).current_price) * amount}</Text>
            </View>
       
            <Container width="100%" height="55px" alignItems="flex-start" marginTop="10px">
                <Button>
                    <Pressable style={{ flex: 1, justifyContent: 'center', backgroundColor: theme.primaryBackgroundColor, width: '100%', borderRadius: 10, alignItems: 'center' }} onPress={() => nextStep(2)}>
                        <Text color="white">{`Buy ${amount} ${switchText()}`}</Text>
                    </Pressable>
                </Button>
            </Container>
        </View>
    )
}
