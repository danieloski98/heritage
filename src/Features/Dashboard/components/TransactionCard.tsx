import React from 'react'
import { View, Text, StyleSheet, Pressable, Platform, Image } from 'react-native'
import { ITransaction } from '../../../Types/Transaction';
import { theme } from '../../../utils/theme'
import { currencyFormatterNGN } from '../../../utils/currencyConverter'
import * as moment from 'moment';
 
// redux
import {RootState} from '../../../store/index'
import {useSelector} from 'react-redux'

const os = Platform.OS;
const BTC = require('../../../../assets/crypto/BTC.png');
const ETH = require('../../../../assets/crypto/ETC.png');
const USDT = require('../../../../assets/crypto/USDC.png')

const Moment = moment.default().days()

export default function TransactionCard({ transaction, setActive }: {transaction: ITransaction, setActive: Function}) {
    const user = useSelector((state: RootState) => state.userdetail.user);

    const status = (stat: number) => {
        switch(stat) {
            case 1: {
                return 'Processing';
            }
            case 2: {
                return 'Done';
            }
            case 3: {
                return 'Declined';
            }
        }
    }

    const coinSwitcher = (coin: number) => {
        switch(coin) {
            case 1: {
                return 'BTC'
            }
            case 2: {
                return 'ETH'
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

    const getDate = (date: any) => {
        const dt = moment.default(date);
        return dt.startOf('minutes').fromNow();
      }

    return (
        <Pressable onPress={() => setActive(transaction)} style={style.parent}>

            {/* right */}

           <View style={style.left}>

              {/* {transaction.type === 1 && 
              ( */}
                <View style={{ width: 30, height: 30}}>
                    <Image source={imageSwitcher(transaction.coin_type)} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
               </View>

               {transaction.type === 1 && <Text style={style.header}>Purchase of {transaction.coin_amount} {coinSwitcher(transaction.coin_type)}
                
               </Text>}
               {transaction.type === 2 && <Text style={style.header}>NGN {currencyFormatterNGN(transaction.amount)} TO {user.bank_name}</Text>}
            <Text style={style.normalText}>{getDate(transaction.createdAt)}</Text>
           </View>

           {/* left */}

           <View style={style.right}>
                <View style={{...style.button, borderColor: borderColor()}}>
                    <Text style={{ color: borderColor(), fontFamily: 'Inter-Light', fontSize: 14 }}>{status(transaction.status)}</Text>
                </View>
           </View>

        </Pressable>
    )
}

const style = StyleSheet.create({
    parent: {
        width: '90%',
        height: 120,
        flexDirection: 'row',
        backgroundColor: 'whitesmoke',
        paddingHorizontal: 20,
        marginHorizontal: 20,
        marginBottom: 10,
        alignSelf: 'center',
        borderRadius: 10,
    },
    left: {
        flex: 0.7,
        justifyContent: 'center',
        paddingRight: 10,
    },
    right: {
        flex: 0.3,
        width: '30%',
        justifyContent: 'center'
    },
    button: {
        width: '100%',
        height: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.pending,
    },
    header: {
        marginTop: 12,
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
    },
    normalText: {
        fontSize: 14,
        color: 'grey',
        marginTop: 15,
        fontFamily: 'Inter-Light'
    }
})
