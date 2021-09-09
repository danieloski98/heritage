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
        <Container width="320px" height="170px" borderRadius="10px" bgColor={theme.primaryBackgroundColor} marginRight="20px" alignItems="flex-start" justifyContent="center">

           <Container width="100%" height="100%" bgColor="#08080863" borderRadius="10px" marginRight="20px" paddingTop="20px" paddingBottom="20px" paddingLeft="20px" paddingRight="20px" alignItems="flex-start" justifyContent="center">

                <Text fontSize="18px" color="white" fontWeight="600">{props.text1}</Text>
                <Text fontSize="30px" color="white" fontWeight="bold" marginTop="20px" marginLeft="20px">{props.prize}</Text>
                <Text fontSize="18px" color="white" fontWeight="600" marginTop="20px">{props.text2}</Text>

           </Container>

        </Container>
    )
}
