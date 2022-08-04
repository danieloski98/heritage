import React from 'react'
import { View, Pressable, Image, Platform, Dimensions, StatusBar, TouchableOpacity } from 'react-native'
import Button from '../../../globalcomponents/Button'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { theme } from '../../../utils/theme'
import PagerView from 'react-native-pager-view';
import { useNavigation } from '@react-navigation/native'
import { MotiView, AnimatePresence } from 'moti'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

const HEIGTH = Dimensions.get('screen').height;

export default function Home(props: any) {
    const [page, setPage] = React.useState(0);
    const navigation = useNavigation<any>();
    const tokenStorage = useAsyncStorage('token');
    const idStorage = useAsyncStorage('id');
    const passedHome = useAsyncStorage('passedHome')

    React.useState(() => {
        // (async function() {
        //     //const token = await tokenStorage.getItem();
        //     const passed = await passedHome.getItem();
        //     if (passed === null || passed !== 'true') {
        //         return;
        //     } else {
        //         const id = await idStorage.getItem();
        //         if (id === null) {
        //             navigation.navigate('login')
        //         }else {
        //             navigation.navigate('index');
        //         }
        //     }
           
        // })()
    });

    const nav = () => {
        passedHome.setItem('true');
        props.navigation.navigate('login');
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme.darkBlue }}>
            <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
            <View style={{ width: '100%', flex: 0.12, backgroundColor: theme.darkBlue, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', }}>
                    <Text style={{ fontWeight: Platform.OS === 'ios' ? '600':'bold', fontSize: 25, color: 'white' }}>Heritage</Text>
                    <Text style={{ fontWeight: '300', fontSize: 25, color: 'white', marginLeft: 5 }}>Exchange</Text>
            </View>

            <View style={{ width: '100%', flex: 0.7, backgroundColor: theme.darkBlue, justifyContent: 'flex-start' }}>

                <Container width="100%" height="80%"  bgColor="transparent">
                    <PagerView style={{ flex: 1, width: '100%', height: '100%', backgroundColor: 'transparent' }} initialPage={page} scrollEnabled transitionStyle="scroll" onPageSelected={(e) => setPage(e.nativeEvent.position)}>

                        <Container width="100%" height="100%" key="1" alignItems="center" justifyContent="flex-start" paddingLeft="10px" paddingRight="10px" bgColor={theme.darkBlue}>
                            <Container width="100%" height="80%" alignItems="center" bgColor={theme.darkBlue}>
                                <Image source={require('../../../../assets/crypto/BTC.png')} resizeMode="contain" style={{ width: '60%', height: 170, position: 'absolute', left: 40, top: 120 }} />
                                <Image source={require('../../../../assets/crypto/ETC.png')} resizeMode="contain" style={{ width: '30%', height: '100%', position: 'absolute', left: 190, top: 70 }} />
                            </Container>
                            <Text textAlign="center" color="white" fontSize="22px" fontWeight="bold" marginTop="10px">Buy Cryptocurrency Instantly</Text>
                            <Text textAlign="center" fontSize="14" marginTop="5px" marginBottom="20px">You can buy cryptocurrency seamlessly from Heritage Exchange</Text>
                        </Container>

                        <Container width="100%" height="100%" alignItems="center" justifyContent="center"key="2" paddingLeft="20px" paddingRight="20px" paddinBottom="10px" bgColor={theme.darkBlue}>
                            <Container width="100%" height="80%" alignItems="center" bgColor="#020B4D">
                                <Image source={require('../../../../assets/crypto/GBP.png')} resizeMode="contain" style={{ width: '60%', height: 170, position: 'absolute', left: 40, top: 120 }} />
                                <Image source={require('../../../../assets/crypto/USDC.png')} resizeMode="contain" style={{ width: '30%', height: '100%', position: 'absolute', left: 190, top: 70 }} />
                            </Container>
                            <Text textAlign="center" color="white" fontSize="22px" fontWeight="bold" marginTop="10px">Sell Cryptocurrency On The Go</Text>
                            <Text textAlign="center" fontSize="14" marginTop="5">You can sell cryptocurrency seamlessly from Heritage Exchange</Text>
                        </Container>

                        <Container width="100%" height="100%" alignItems="center" justifyContent="center" key="3" paddingLeft="10px" paddingRight="10px" bgColor={theme.darkBlue}>
                            <Container width="100%" height="80%" alignItems="center" bgColor="#020B4D">
                                <Image source={require('../../../../assets/crypto/SHIB.png')} resizeMode="contain" style={{ width: '60%', height: 170, position: 'absolute', left: 40, top: 120 }} />
                                <Image source={require('../../../../assets/crypto/BNB.png')} resizeMode="contain" style={{ width: '30%', height: '100%', position: 'absolute', left: 190, top: 70 }} />
                            </Container>
                            <Text textAlign="center" color="white" fontSize="22px" fontWeight="bold" marginTop="10px">Live Market</Text>
                            <Text textAlign="center" fontSize="16px" marginTop="5px">Live market updates</Text>
                        </Container>
                    </PagerView>
                </Container>

                   {/* bottom section */}
                   <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 20, marginTop: 20, backgroundColor: 'transparent' }}>
                    
                    <Container flexDirection="row" justifyContent="center"  bgColor={theme.darkBlue}>
                        <Container width="10px" height="10px" borderRadius="10px" bgColor={page === 0 ? theme.primaryBackgroundColor : 'lightgrey'} marginRight="5px" />
                        <Container width="10px" height="10px" borderRadius="10px" bgColor={page === 1 ? theme.primaryBackgroundColor : 'lightgrey'} marginRight="5px" />
                        <Container width="10px" height="10px" borderRadius="10px" bgColor={page === 2 ? theme.primaryBackgroundColor : 'lightgrey'} />
                    </Container>
                    
                </View>

                 {/* button */}
                 <AnimatePresence>
                        {page === 2 && (
                            <MotiView 
                                from={{ translateY: 200,  opacity: 0 }}
                                animate={{ translateY: theme.screenHeight/100*5, opacity: 1 }}
                                // animate={{ translateY: HEIGTH <= 700 ? -HEIGTH/100*10: 50, opacity: 1}}
                                exit={{ translateY: 200, opacity: 0 }}
                                transition={{
                                    type: 'spring',
                                }}
                                style={{ width: theme.screenWidth, paddingHorizontal: 20, height: theme.buttonHeight, zIndex: 20, backgroundColor: 'transparent' }}>
                                <Pressable onPress={nav} style={{ width: '100%', height: '100%', backgroundColor: theme.primaryBackgroundColor, borderRadius: 10, alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                                  
                                        <Text fontSize="16px" fontWeight="600" color="white">Get Started</Text>
                                    
                                </Pressable>
                            </MotiView>
                        )}
                    </AnimatePresence>

                 

            </View>
        </View>
    )
}
