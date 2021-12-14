import React from 'react'
import { View } from 'react-native'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { theme } from '../../../utils/theme'

interface IProps {
    text1: string;
    prize: string;
    text2: string;
}

export default function Card(props: IProps) {
    return (
        <View style={{ width: '100%', height: 170 }}>

           <View style={{ padding: 20, backgroundColor: 'white', width: '100%', height: '100%',  borderWidth: 1, borderColor: 'lightgrey', borderRadius: 10, overflow: 'hidden'  }}>

                <Text fontSize="18px" color="grey" fontWeight="600">{props.text1}</Text>
                <Text fontSize="30px" color="black" fontWeight="bold" marginTop="20px" marginLeft="20px">{props.prize}</Text>
                <Text fontSize="18px" color="grey" fontWeight="600" marginTop="20px">{props.text2}</Text>

           </View>

        </View>
    )
}
