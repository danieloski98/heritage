import React from 'react'
import { View, Pressable } from 'react-native'
import Button from '../../../globalcomponents/Button'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { theme } from '../../../utils/theme'
import PagerView from 'react-native-pager-view';
import { useNavigation } from '@react-navigation/native'

export default function Home(props: any) {
    const [page, setPage] = React.useState(0);
    const navigation = useNavigation<any>();

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Container width="100%" height="20%" bgColor="white" />
            <Container width="100%" height="80%" bgColor="transparent" justifyContent="flex-start" alignItems="center">
                <Container width="100%" height="50%">
                    <PagerView style={{ flex: 1, width: '100%', height: '100%' }} initialPage={page} scrollEnabled transitionStyle="scroll" onPageSelected={(e) => setPage(e.nativeEvent.position)}>
                        <Container width="100%" height="100%" key="1" alignItems="center" justifyContent="center" paddingLeft="10px" paddingRight="10px">
                            <Text textAlign="center" color="black" fontSize="22" fontWeight="bold">Buy Cryptocurrency Instantly</Text>
                            <Text textAlign="center" fontSize="14" marginTop="5">You can buy cryptocurrency seamlessly from Heritage Exchange</Text>
                        </Container>
                        <Container width="100%" height="100%" alignItems="center" justifyContent="center"key="2" paddingLeft="10px" paddingRight="10px">
                            <Text textAlign="center" color="black" fontSize="22" fontWeight="bold">Sell Cryptocurrency On The Go</Text>
                            <Text textAlign="center" fontSize="14" marginTop="5">You can sell cryptocurrency seamlessly from Heritage Exchange</Text>
                        </Container>
                        <Container width="100%" height="100%" alignItems="center" justifyContent="center" key="3" paddingLeft="10px" paddingRight="10px">
                            <Text textAlign="center" color="black" fontSize="22" fontWeight="bold">Save Your Funds in Cryptocurrency</Text>
                            <Text textAlign="center" fontSize="16" marginTop="5">Secure your funds, save in cryptocurrency today</Text>
                        </Container>
                    </PagerView>
                </Container>

                {/* button */}
                <Container width="100%" height={theme.buttonHeight} paddingLeft="20px" paddingRight="20px" marginTop="20px">
                    <Pressable onPress={() => props.navigation.navigate('login')} style={{ width: '100%' }}>
                        <Button>
                            <Text fontSize="16" fontWeight="600">Get Started</Text>
                        </Button>
                    </Pressable>
                </Container>

                {/* bottom section */}
                <Container flexDirection="row" width="100%" height="20%" justifyContent="space-between" paddingLeft="20px" paddingRight="20px">
                    <Text fontSize="18px"></Text>
                    <Container flexDirection="row" justifyContent="center">
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
