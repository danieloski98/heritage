import React from 'react'
import { Image, Pressable } from 'react-native'
import Container from '../../../globalcomponents/Container'
import BTC from '../../../globalcomponents/icons/BTC'
import Text from '../../../globalcomponents/Text'

function getname() {}

interface IProps {
    type: number;
    action: number;
    onPress: typeof getname;
}

export default function BuySellCard(props: IProps) {
    const getimage = () => {
        if (props.type === 1) {
            return require('../../../../assets/icons/btc.png')
        }

        if (props.type === 2 ) {
            return require('../../../../assets/icons/eth.png')
        }

        if (props.type === 3) {
            return require('../../../../assets/icons/tether.png')
        }
    }

    const short = () => {
            if (props.type === 1) {
                return 'BTC'
            }
    
            if (props.type === 2 ) {
                return 'ETH'
            }
    
            if (props.type === 3) {
                return 'USDT'
            }
    }

    const gettext = () => {
        if (props.action === 1) {
            return `Buy ${short()}`
        }

        if (props.action === 2 ) {
            return `Sell ${short()}`
        }
    }

    const getcoin = () => {
        if (props.type === 1) {
            return `Bitcoin`
        }

        if (props.type === 2 ) {
            return `Ethereum`
        }

        if (props.type === 3) {
            return 'USDT'
        }
    }

    return (
        <Container width="100%" height="130px" borderRadius="10px" bgColor="white" flexDirection="row" justifyContent="space-between" alignItems="center" paddingLeft="20px" paddingRight="20px" marginBottom="10px">

            <Container width="50%" height="50px" flexDirection="row" justifyContent="flex-start" bgColor="white" alignItems="center">

                <Container width="50px" height="50px" bgColor="white">
                    <Image source={getimage()} resizeMode="contain" style={{ width: '100%', height: '100%'}} />
                </Container>

                <Text marginLeft="20px" fontSize="20px" color="black" fontWeight="600">{getcoin()}</Text>

            </Container>

            <Container width="50%" height="50px" bgColor="white" alignItems="flex-end" justifyContent="center">

                <Container width="100px" height="40px" justifyContent="center" alignItems="center" borderRadius="20px" >

                    <Pressable
                        onPress={() => props.onPress()}
                    >
                        <Text color="black">{gettext()}</Text>
                    </Pressable>

                </Container>

            </Container>

        </Container>
    )
}
