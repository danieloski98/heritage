import React from 'react'
import { View, Pressable } from 'react-native'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { theme } from '../../../utils/theme'

interface IProps {
    text1: string;
    prize: string;
    text2: string;
}

export default function SavingsCard(props: IProps) {
    return (
        <Container width="320px" height="170px" borderRadius="10px" bgColor={theme.primaryBackgroundColor} marginRight="20px" alignItems="flex-start" justifyContent="center">

        <Container width="100%" height="100%" bgColor="#08080863" borderRadius="10px" marginRight="20px" paddingTop="20px" paddingBottom="20px" paddingLeft="20px" paddingRight="20px" alignItems="flex-start" justifyContent="center">


            <Container flexDirection="row" width="100%" height="30px" bgColor="transparent" alignItems="center">
                <Pressable style={{ backgroundColor: 'rgba(255, 255, 255, 0.226)', width: 70, height: '100%', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text color="white">Top Up</Text>
                </Pressable>
                <Pressable style={{ backgroundColor: 'rgba(255, 255, 255, 0.226)', width: 70, height: '100%', borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                    <Text color="white">Withdraw</Text>
                </Pressable>
            </Container>

             <Text fontSize="18px" color="white" fontWeight="600">{props.text1}</Text>
             <Text fontSize="25px" color="white" fontWeight="bold" marginTop="20px" marginLeft="20px">{props.prize}</Text>
             <Text fontSize="18px" color="white" fontWeight="600" marginTop="20px">{props.text2}</Text>

        </Container>

     </Container>
    )
}
