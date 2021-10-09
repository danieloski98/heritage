import React from 'react'
import { View, Pressable, RefreshControl, StatusBar } from 'react-native'
import { theme } from '../../../utils/theme'
import { ScrollView } from 'react-native-gesture-handler'
import Text from '../../../globalcomponents/Text'
import Container from '../../../globalcomponents/Container'
import Card from '../components/Card'
import Button from '../../../globalcomponents/Button'
import BuySellCard from '../components/Buy&SellCard'
import AddDetails from '../../../globalcomponents/Modals/AddDetails'

export default function Home() {
    const [tab, setTab] = React.useState(1)
    const [showLinkModal, setShowLinkModal] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false)

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
      }, []);

      const closeLinkModal = () => {
          setShowLinkModal(false);
      }

      const openLinkModal = () => {
          setShowLinkModal(true);
      }

    return (
        <View style={{ backgroundColor: theme.light, height: theme.screenHeight }}>
            <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />

            {/* modals */}
            <AddDetails visible={showLinkModal} close={closeLinkModal} />

            <ScrollView horizontal={false} showsVerticalScrollIndicator={false} scrollEnabled refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.primaryBackgroundColor]} tintColor={theme.primaryBackgroundColor} />}>

                    {/* header text */}

                    <Container width='100%' height="50px" alignItems="flex-start" marginTop="20px" paddingLeft="20px" paddingRight="20px" bgColor={theme.light}>
                        <Text color="black" fontWeight="bold" fontSize="20px" >Dashboard</Text>
                        <Text marginTop="16px" fontSize="16px" color="grey">Hi Michael, Welcome Back</Text>
                    </Container>
                    
                    {/* scrollview cards */}

                    <Container width="100%" height="200px" alignItems="flex-start" paddingLeft="20px" marginTop="20px" bgColor={theme.light}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1 }} contentContainerStyle={{ alignItems: 'center' }}>
                            <Card text1="Today's Rate" prize="N500/$" text2="Rates are updated daily" />
                            <Card text1="BTC Value" prize="$34,000" text2="NGN: N12,000,000.00" />
                            <Card text1="Ethereum Value" prize="$139,000" text2="NGN: N12,000,000.00" />
                        </ScrollView>
                    </Container>

                    {/* tab */}

                    <Container width="100%" height="60px" marginTop="20px" paddingLeft="20px" paddingRight="20px" bgColor={theme.light}>
                        <Container width="100%" height="100%" flexDirection="row" bgColor="white" paddingLeft="1px" paddingRight="1px" paddingTop="1px" paddingBottom="1px" justifyContent="flex-start" borderRadius="10px" >

                            <Container width="50%" height="100%"  bgColor="white">
                                <Pressable style={{ flex: 1, width: '100%' }} onPress={() => setTab(1)}>
                                    <Button backgroundColor={tab === 1 ? theme.primaryBackgroundColor : 'white'}>
                                        <Text color={tab === 1 ? 'white':'grey'} fontWeight="600" fontSize="16px">Buy Crypto</Text>
                                    </Button>
                                </Pressable>
                            </Container>

                            <Container width="50%" height="100%" bgColor="white">
                                <Pressable style={{ flex: 1, width: '100%' }} onPress={() => setTab(2)}>
                                    <Button backgroundColor={tab === 2 ? theme.primaryBackgroundColor : 'white'}>
                                        <Text color={tab === 2 ? 'white':'grey'} fontWeight="600" fontSize="16px">Sell Crypto</Text>
                                    </Button>
                                </Pressable>
                            </Container>

                        </Container>
                    </Container>

                    {/* crypto List */}

                    { tab === 1 && <Container width="100%" height="700px" paddingLeft="20px" paddingRight="20px" alignItems="flex-start" justifyContent="flex-start" marginTop="50px" bgColor={theme.light}>
                        <BuySellCard type={1} action={1} onPress={() => openLinkModal()} />
                        <BuySellCard type={2} action={1} onPress={() => openLinkModal()} />
                        <BuySellCard type={3} action={1} onPress={() => openLinkModal()} />
                    </Container>
                    }

                    {
                        tab === 2 && 
                        <Container width="100%" height="800px" paddingLeft="20px" paddingRight="20px" alignItems="flex-start" justifyContent="flex-start" marginTop="50px" bgColor={theme.light}>
                            <BuySellCard type={1} action={2} onPress={() => openLinkModal()} />
                            <BuySellCard type={2} action={2} onPress={() => openLinkModal()} />
                            <BuySellCard type={3} action={2} onPress={() => openLinkModal()} />
                        </Container>
                    }

            </ScrollView>


        </View>
    )
}
