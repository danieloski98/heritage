import React from 'react'
import { Image, Pressable, View, TouchableOpacity  } from 'react-native'
import Container from '../../../globalcomponents/Container'
import BTC from '../../../globalcomponents/icons/BTC'
import Text from '../../../globalcomponents/Text'
import { Ionicons, Feather } from '@expo/vector-icons'
import { theme } from '../../../utils/theme'
import { currencyFormatterD, currencyFormatterNGN } from '../../../utils/currencyConverter'
import { FontAwesome5 } from '@expo/vector-icons'

function getname() {}

interface IProps {
    type: number;
    action: number;
    buy: typeof getname;
    sell: typeof getname;
    coinStat: any;
}

export default function BuySellCard(props: IProps) {
    // console.log(props.coinStat);
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

    const gettext = (action: number) => {
        if (action === 1) {
            return `Buy ${short()}`
        }

        if (action === 2 ) {
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
        <View style={{ width: '100%', height: '100%', backgroundColor: 'white',  zIndex: 20 }}>

            <View style={{ flexDirection: 'row', width: '100%', height: 65, alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'transparent', paddingHorizontal: 10 }}>
                <View style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }}>
                    <Image source={getimage()} resizeMode="contain" style={{ width: 50, height: 50}} />
                    <Text fontSize="16px" color="black" fontWeight="600" marginLeft="10px">{getcoin()}</Text>
                </View>

                <View style={{ flexDirection: 'row', height: '100%', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <FontAwesome5 name="caret-up" color="green" size={15} />
                    <Text fontSize="16px" color="black" fontWeight="600" marginLeft="10px">8.06%</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, paddingHorizontal: 10 }}>
                <Feather name="dollar-sign" color="green" size={15} />
                <Text fontSize="18px" color="black" fontWeight="400" marginTop="0px" marginLeft="0px">{props.coinStat !== undefined ? currencyFormatterD(props.coinStat.current_price): '0'}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center',  marginTop: 3, paddingHorizontal: 15 }}>
                <Text color="black">NGN</Text>
                <Text fontSize="14px" color="black" fontWeight="400" marginTop="0px" marginLeft="5px">{props.coinStat !== undefined ? currencyFormatterNGN(props.coinStat.current_price * 550): '0'}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, justifyContent: 'space-between', marginTop: 10 }}>
                <View style={{ width: '45%', height: '60%', borderRadius: 20, borderWidth: 2, borderColor: 'grey' }}>
                    <TouchableOpacity
                            onPress={() => props.buy()}
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Text color="black">{gettext(1)}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '45%', height: '60%', borderRadius: 20, borderWidth: 2, borderColor: 'grey' }}>
                    <TouchableOpacity
                            onPress={() => props.sell()}
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: 50 }}
                        >
                            <Text color="black">{gettext(2)}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* <Container width="50%" height="50px" flexDirection="row" justifyContent="flex-start" bgColor="white" alignItems="center">

                <Container width="50px" height="50px" bgColor="white">
                    <Image source={getimage()} resizeMode="contain" style={{ width: '100%', height: '100%'}} />
                </Container>

                <View style={{ marginLeft: 20, }}>
                    <Text fontSize="18px" color="black" fontWeight="bold">{getcoin()}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Feather name="dollar-sign" color="green" size={15} />
                        <Text fontSize="14px" color="black" fontWeight="400" marginTop="0px" marginLeft="0px">{props.coinStat !== undefined ? currencyFormatterD(props.coinStat.current_price): '0'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center',  marginTop: 10 }}>
                        <Text color="black">NGN</Text>
                        <Text fontSize="14px" color="black" fontWeight="600" marginTop="0px" marginLeft="5px">{props.coinStat !== undefined ? currencyFormatterNGN(props.coinStat.current_price * 550): '0'}</Text>
                    </View>
                </View>

            </Container>

            <Container width="50%" height="50px" bgColor="white" alignItems="flex-end" justifyContent="center">

                <Container width="100px" height="40px" justifyContent="center" alignItems="center" borderRadius="20px" >

                    <Pressable
                        onPress={() => props.onPress()}
                    >
                        <Text color="black">{gettext()}</Text>
                    </Pressable>

                </Container>

            </Container> */}

        </View>
    )
}
