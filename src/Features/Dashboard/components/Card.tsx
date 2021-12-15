import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { theme } from '../../../utils/theme'
import { useNavigation } from '@react-navigation/native'

interface IProps {
    text1: string;
    prize: string;
    text2: string;
}

export default function Card(props: IProps) {

    const navigation = useNavigation<any>();

    return (
        <View style={{ width: '100%', flexDirection: 'row' }}>

           <View style={{ padding: 20, backgroundColor: 'white', width: '100%', height: '100%',  borderWidth: 1, borderColor: 'lightgrey', borderRadius: 10, overflow: 'hidden', flexDirection: 'row' }}>

                <View style={{ flex: 0.6}}>
                    <Text fontSize="18px" color="grey" fontWeight="600">{props.text1}</Text>
                    <Text fontSize="30px" color="black" fontWeight="bold" marginTop="20px" marginLeft="0px">{props.prize}</Text>
                    <Text fontSize="18px" color="grey" fontWeight="600" marginTop="20px">{props.text2}</Text>
                </View>

                <View style={{ flex: 0.4, justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('savings')} style={{ width: '100%', height: 40, borderWidth: 1, borderColor: 'grey', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>Savings</Text>
                    </TouchableOpacity>
                </View>

           </View>

        </View>
    )
}
