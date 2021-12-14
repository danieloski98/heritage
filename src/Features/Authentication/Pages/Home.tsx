import React from 'react'
import { View, Pressable, Image, Platform } from 'react-native'
import Button from '../../../globalcomponents/Button'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { theme } from '../../../utils/theme'
import PagerView from 'react-native-pager-view';
import { useNavigation } from '@react-navigation/native'
import { MotiView, AnimatePresence } from 'moti'

export default function Home(props: any) {
    const [page, setPage] = React.useState(0);
    const navigation = useNavigation<any>();

    return (
        <View style={{ flex: 1, backgroundColor: '#020B4D' }}>
            <View style={{ width: '100%', height: 100, backgroundColor: '#020B4D', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontWeight: Platform.OS === 'ios' ? '600':'bold', fontSize: 25, color: 'white' }}>Heritage</Text>
                    <Text style={{ fontWeight: '300', fontSize: 25, color: 'white', marginLeft: 5 }}>Exchange</Text>
            </View>

            <Container width="100%" height="80%" bgColor="#020B4D" justifyContent="flex-start" alignItems="center">

                <Container width="100%" height="50%"  bgColor="#020B4D">
                    <PagerView style={{ flex: 1, width: '100%', height: '100%' }} initialPage={page} scrollEnabled transitionStyle="scroll" onPageSelected={(e) => setPage(e.nativeEvent.position)}>

                        <Container width="100%" height="100%" key="1" alignItems="center" justifyContent="flex-start" paddingLeft="10px" paddingRight="10px" bgColor="#020B4D">
                            <Container width="100%" height="80%" alignItems="center" bgColor="#020B4D">
                                <Image source={require('../../../../assets/crypto/BTC.png')} resizeMode="contain" style={{ width: '50%', height: '100%' }} />
                                <Image source={require('../../../../assets/crypto/ETC.png')} resizeMode="contain" style={{ width: '25%', height: '100%', position: 'absolute', left: 200, top: 80 }} />
                            </Container>
                            <Text textAlign="center" color="white" fontSize="22px" fontWeight="bold" marginTop="20px">Buy Cryptocurrency Instantly</Text>
                            <Text textAlign="center" fontSize="14" marginTop="5">You can buy cryptocurrency seamlessly from Heritage Exchange</Text>
                        </Container>

                        <Container width="100%" height="100%" alignItems="center" justifyContent="center"key="2" paddingLeft="10px" paddingRight="10px" bgColor="#020B4D">
                            <Container width="100%" height="80%" alignItems="center" bgColor="#020B4D">
                                <Image source={require('../../../../assets/crypto/GBP.png')} resizeMode="contain" style={{ width: '50%', height: '100%' }} />
                                <Image source={require('../../../../assets/crypto/USDC.png')} resizeMode="contain" style={{ width: '25%', height: '100%', position: 'absolute', left: 200, top: 80 }} />
                            </Container>
                            <Text textAlign="center" color="white" fontSize="22px" fontWeight="bold" marginTop="20px">Sell Cryptocurrency On The Go</Text>
                            <Text textAlign="center" fontSize="14" marginTop="5">You can sell cryptocurrency seamlessly from Heritage Exchange</Text>
                        </Container>

                        <Container width="100%" height="100%" alignItems="center" justifyContent="center" key="3" paddingLeft="10px" paddingRight="10px" bgColor="#020B4D">
                            <Container width="100%" height="80%" alignItems="center" bgColor="#020B4D">
                                <Image source={require('../../../../assets/crypto/SHIB.png')} resizeMode="contain" style={{ width: '50%', height: '100%' }} />
                                <Image source={require('../../../../assets/crypto/BNB.png')} resizeMode="contain" style={{ width: '25%', height: '100%', position: 'absolute', left: 200, top: 80 }} />
                            </Container>
                            <Text textAlign="center" color="white" fontSize="22px" fontWeight="bold" marginTop="20px">Save Your Funds in Cryptocurrency</Text>
                            <Text textAlign="center" fontSize="16px" marginTop="5">Secure your funds, save in cryptocurrency today</Text>
                        </Container>
                    </PagerView>
                </Container>

                {/* button */}
                    <AnimatePresence>
                        {page === 2 && (
                            <MotiView 
                                from={{ translateY: 200, opacity: 0 }}
                                animate={{ translateY: 0, opacity: 1}}
                                exit={{ translateY: 200, opacity: 0 }}
                                transition={{
                                    type: 'spring',
                                }}
                                style={{ width: '100%', paddingHorizontal: 20, position: 'absolute', top: 500, height: theme.buttonHeight, zIndex: 20 }}>
                                <Pressable onPress={() => props.navigation.navigate('login')} style={{ width: '100%', height: '100%', backgroundColor: theme.primaryBackgroundColor, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                  
                                        <Text fontSize="16px" fontWeight="600" color="white">Get Started</Text>
                                    
                                </Pressable>
                            </MotiView>
                        )}
                    </AnimatePresence>

                {/* bottom section */}
                <Container flexDirection="row" width="100%" height="20%" justifyContent="space-between" paddingLeft="20px" paddingRight="20px" bgColor="#020B4D">
                    <Text fontSize="18px"></Text>
                    <Container flexDirection="row" justifyContent="center"  bgColor="white">
                        <Container width="10px" height="10px" borderRadius="10px" bgColor={page === 0 ? theme.primaryBackgroundColor : 'lightgrey'} marginRight="5px" />
                        <Container width="10px" height="10px" borderRadius="10px" bgColor={page === 1 ? theme.primaryBackgroundColor : 'lightgrey'} marginRight="5px" />
                        <Container width="10px" height="10px" borderRadius="10px" bgColor={page === 2 ? theme.primaryBackgroundColor : 'lightgrey'} />
                    </Container>
                    <Text fontSize="18px" color={theme.primaryBackgroundColor}></Text>
                </Container>

            </Container>
        </View>
    )
}
