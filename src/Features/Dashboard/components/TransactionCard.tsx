import React from 'react'
import { View, Text, StyleSheet, Pressable, Platform, Image } from 'react-native'
import { ITransaction } from '../../../Types/Transaction';
import { theme } from '../../../utils/theme'
import { currencyFormatterNGN } from '../../../utils/currencyConverter'
 
// redux
import {RootState} from '../../../store/index'
import {useSelector} from 'react-redux'

const os = Platform.OS;
const BTC = require('../../../../assets/crypto/BTC.png');
const ETH = require('../../../../assets/crypto/ETC.png');
const USDT = require('../../../../assets/crypto/USDC.png')

export default function TransactionCard({ transaction }: {transaction: ITransaction}) {
    const user = useSelector((state: RootState) => state.userdetail.user);

    const status = (stat: number) => {
        switch(stat) {
            case 1: {
                return 'Processing'
            }
            case 2: {
                return 'Done'
            }
            case 3: {
                'Declined'
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

    return (
        <View style={style.parent}>

            {/* right */}

           <View style={style.left}>

              {transaction.type === 1 && 
              (
                <View style={{ width: 30, height: 30}}>
                    <Image source={imageSwitcher(transaction.coin_type)} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
               </View>
              )}

               {transaction.type === 1 && <Text style={style.header}>Purchase of {transaction.coin_amount} {coinSwitcher(transaction.coin_type)}
                
               </Text>}
               {transaction.type === 2 && <Text style={style.header}>NGN {currencyFormatterNGN(transaction.amount)} TO {user.bank_name}</Text>}
               <Text style={style.normalText}>June 21, 2021 : 7.00 AM</Text>
           </View>

           {/* left */}

           <View style={style.right}>
                <Pressable style={style.button}>
                    <Text style={{ color: theme.pending }}>{status(transaction.status)}</Text>
                </Pressable>
           </View>

        </View>
    )
}

const style = StyleSheet.create({
    parent: {
        width: '90%',
        height: 120,
        flexDirection: 'row',
        backgroundColor: theme.light,
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
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: theme.pending,
    },
    header: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: os === 'ios' ? '600':'bold',
    },
    normalText: {
        fontSize: 12,
        color: 'grey',
        marginTop: 20
    }
})
