import { View, Text, Modal, ScrollView, Image } from 'react-native';
import React from 'react';
import Container from '../../../globalcomponents/Container';
import { theme } from '../../../utils/theme';
import { ITransaction } from '../../../Types/Transaction';
import {Feather} from '@expo/vector-icons'
import * as moment from 'moment';
import { currencyFormatterD, currencyFormatterNGN } from '../../../utils/currencyConverter';

// redux
import {useSelector} from 'react-redux'
import {RootState} from '../../../store/index'

const BTC = require('../../../../assets/crypto/BTC.png');
const ETH = require('../../../../assets/crypto/ETC.png');
const USDT = require('../../../../assets/crypto/USDC.png')

export default function TransactionModal({ transaction, open, close }: {transaction: ITransaction, open: boolean, close: Function}) {
    const rate = useSelector((state: RootState) => state.paypoint.paypoint.buy_rate);
    const user = useSelector((state: RootState) => state.userdetail.user);

    const status = (stat: number) => {
        switch(stat) {
            case 1: {
                return 'Processing';
            }
            case 2: {
                return 'Approved';
            }
            case 3: {
                return 'Declined';
            }
        }
    }

    const borderColor = () => {
        switch(transaction.status) {
            case 1: {
                return theme.pending;
            }
            case 2: {
                return theme.completed;
            }
            case 3: {
                return theme.failed
            }
        }
    }

    const coinSwitcher = (coin: number) => {
        switch(coin) {
            case 1: {
                return 'Bitcoin'
            }
            case 2: {
                return 'Ethereum'
            }
            case 3: {
                return 'USDT'
            }
        }
    }

    const imageSwitcher = (coin: number) => {
        switch(coin) {
            case 1: {
                return BTC
            }
            case 2: {
                return ETH
            }
            case 3: {
                return USDT
            }
        }
    }

    const wallet = (coin: number) => {
        switch(coin) {
            case 1: {
                return user.bitcoin_wallet
            }
            case 2: {
                return user.ethereum_wallet
            }
            case 3: {
                return user.usdt_wallet
            }
        }
    }

    const getDate = (date: string) => {
        const dt = moment.default(new Date(date));
        return dt.startOf('milliseconds').fromNow();
      }


  return (
    <Modal transparent animationType="slide" visible={open} style={{ backgroundColor: '#00000083'}}>

        <Container height="100%" width="100%" bgColor="#00000083" alignItems="flex-start">

            <View style={{ width: '100%', height: theme.screenHeight/100*65, backgroundColor: 'white', alignItems: 'center', paddingHorizontal: 20 , paddingBottom: 10, borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>

                <ScrollView horizontal={false} style={{ width: '100%' }} showsVerticalScrollIndicator={false}>

                    <View style={{ flex: 0.8 }}>
                        
                    <View style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Feather name='x-circle' color="grey" size={30} onPress={() => close()} />
                    </View>

                    <View style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{ width: 50, height: 50}}>
                            <Image source={imageSwitcher(transaction.coin_type)} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
                        </View>
                    </View>

                    <View style={{ width: '100%', height: 80, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                        <View style={{ flex: 1, paddingRight: 10, height: '100%', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Inter-SemiBold', color: 'black'}}>Transaction Details</Text>
                            <Text style={{ fontSize: 14, fontFamily: 'Inter-Regular', color: 'grey', marginTop: 6 }}>ID: #{transaction._id}</Text>
                        </View>

                        <View style={{ width: '30%'}}>
                            <Text style={{ fontSize: 16, fontFamily: 'Inter-SemiBold', color: 'black'}}>Time</Text>
                            <Text style={{ fontSize: 14, fontFamily: 'Inter-Regular', color: 'grey', marginTop: 6 }}>{new Date(transaction.createdAt).toDateString()}</Text>
                        </View>
                        
                    </View>

                    <View style={{ width: '100%', height: 80, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                        <View style={{ flex: 1, paddingRight: 10, height: '100%', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Inter-SemiBold', color: 'black'}}>Transaction Type</Text>
                            <Text style={{ fontSize: 14, fontFamily: 'Inter-Regular', color: 'grey', marginTop: 6 }}>{transaction.type === 1 ? 'CRYPTO':'FIAT'}</Text>
                        </View>

                        <View style={{ width: '30%' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Inter-SemiBold', color: 'black'}}>Coin Type</Text>
                            <Text style={{ fontSize: 14, fontFamily: 'Inter-Regular', color: 'grey', marginTop: 6 }}>{coinSwitcher(transaction.coin_type)}</Text>
                        </View>
                       
                    </View>

                    <View style={{ width: '100%', height: 80, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        
                        <View style={{ flex: 1, paddingRight: 10, height: '100%', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Inter-SemiBold', color: 'black'}}>Amount USD</Text>
                            <Text style={{ fontSize: 14, fontFamily: 'Inter-Regular', color: 'grey', marginTop: 6 }}>${currencyFormatterD(transaction.amount/rate)}</Text>
                        </View>

                        <View style={{ width: '30%' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Inter-SemiBold', color: 'black'}}>Amount NGN</Text>
                            <Text style={{ fontSize: 14, fontFamily: 'Inter-Regular', color: 'grey', marginTop: 6 }}>NGN{currencyFormatterNGN(transaction.amount || 0)}</Text>
                        </View>
                       
                    </View>

                    <View style={{ width: '100%', minHeight: 70, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                        
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Inter-SemiBold', color: 'black'}}>Recieving {transaction.type === 1 ? 'Address':'Account'}</Text>
                            {transaction.type === 2 && <Text style={{ fontSize: 14, fontFamily: 'Inter-Regular', color: 'grey', marginTop: 6 }}>{user.account_name}</Text>}
                           {transaction.type === 2 &&  <Text style={{ fontSize: 14, fontFamily: 'Inter-Regular', color: 'grey', marginTop: 6 }}>{user.bank_name} - {user.account_number}</Text>}

                           {transaction.type === 1 &&  <Text style={{ fontSize: 14, fontFamily: 'Inter-Regular', color: 'grey', marginTop: 6 }}>{coinSwitcher(transaction.coin_type)} - {wallet(transaction.coin_type)}</Text>}
                        </View>

                        {/* <View style={{ width: '30%' }}>
                            <Text style={{ fontSize: 18, fontWeight: '600', color: 'black'}}>Amount NGN</Text>
                            <Text style={{ fontSize: 12, fontWeight: '500', color: 'grey'}}>NGN150,000.00</Text>
                        </View> */}
                       
                    </View>

                    <View style={{ flex: 0.2, justifyContent: 'flex-end'}}>
                        <View style={{ width: '100%', height: 40, borderColor: borderColor(), borderWidth: 2, borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                                <Text style={{ color: borderColor(), fontFamily: 'Inter-Medium' }}>{status(transaction.status)}</Text>
                        </View>
                    </View>

                    </View>

                   

                </ScrollView>

            </View>

        </Container>

    </Modal>
  );
}
