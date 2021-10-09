import React from 'react'
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native'
import { theme } from '../../../utils/theme'

const os = Platform.OS;

export default function SavingsTransactionCard() {
    return (
        <View style={style.parent}>

            {/* right */}

           <View style={style.left}>
               <Text style={style.header}>N70,000 TO ACCESS BANK</Text>
               <Text style={style.normalText}>June 21, 2021 : 7.00 AM</Text>
           </View>

           {/* left */}

           <View style={style.right}>
                <Pressable style={style.button}>
                    <Text style={{ color: theme.pending }}>Pending</Text>
                </Pressable>
           </View>

        </View>
    )
}

const style = StyleSheet.create({
    parent: {
        width: '100%',
        height: 120,
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        marginHorizontal: 20,
        marginBottom: 10,
        alignSelf: 'center',
        borderRadius: 10,
    },
    left: {
        flex: 1,
        justifyContent: 'center',
    },
    right: {
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
        fontSize: 16,
        fontWeight: os === 'ios' ? '600':'bold',
    },
    normalText: {
        fontSize: 12,
        color: 'grey',
        marginTop: 20
    }
})
