import React from 'react'
import { View, Pressable, RefreshControl, StatusBar, ScrollView } from 'react-native'
import { theme } from '../../../utils/theme'
// import { ScrollView } from 'react-native-gesture-handler'
import Text from '../../../globalcomponents/Text'
import Container from '../../../globalcomponents/Container'
import Card from '../components/Card'
import Button from '../../../globalcomponents/Button'
import BuySellCard from '../components/Buy&SellCard'
import AddDetails from '../../../globalcomponents/Modals/AddDetails'
import BuyModal from '../../../globalcomponents/Modals/BuyModal'
import SellModal from '../../../globalcomponents/Modals/SellModal'
import { STAT_URL } from '../../../utils/statsApi'

export default function Home() {
    const [tab, setTab] = React.useState(1)
    const [showLinkModal, setShowLinkModal] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [coinType, setCoinType] = React.useState(0);
    const [buy, setBuy] = React.useState(false);
    const [sell, setSell] = React.useState(false);
    const [data, setData] = React.useState([] as Array<any>);

    React.useEffect(() => {
        (async function() {
            try {
                const request = await fetch(`${STAT_URL}`);
                const json = await request.json() as Array<any>;
                setData(json.slice(0,5));
            } catch (error) {
                console.log(error);
                alert(JSON.stringify(error));
            }
        })()
    }, []);

    // details
    const [amount, setAmount] = React.useState(0);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        (async function() {
            const request = await fetch(`${STAT_URL}`);
            const json = await request.json() as Array<any>;
            setData(json.slice(0,5));
        })()
        setRefreshing(false);
      }, []);

      const closeLinkModal = () => {
          setShowLinkModal(false);
      }

      const openLinkModal = () => {
          setShowLinkModal(true);
      }

      const openBuy = (type: number) => {
          setCoinType(type);
          setBuy(true);
      }

      const closeBuy = () => {
          setBuy(false);
      }

      const openSell = (type: number) => {
          setCoinType(type);
          setSell(true);
      }

      const closeSell = () => {
          setSell(false);
      }

      const getCoin = (id: string) => {
          return data.filter((item) => item.id === id )[0];
      }

    return (
        <View style={{ backgroundColor: theme.light, height: theme.screenHeight }}>
            <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />

            {/* modals */}
            <AddDetails visible={showLinkModal} close={closeLinkModal} />
            <BuyModal visible={buy} close={closeBuy} coinType={coinType} />
            <SellModal visible={sell} close={closeSell} coinType={coinType} />

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
                            <Card text1="BTC Value" prize={`$${getCoin('bitcoin') !== undefined ? getCoin('bitcoin').current_price:'0'}`} text2={`NGN: ${getCoin('bitcoin') !== undefined ? getCoin('bitcoin').current_price/550:'0'} `} />
                            <Card text1="Ethereum Value" prize={`$${getCoin('ethereum') !== undefined ? getCoin('ethereum').current_price:'0'}`} text2={`NGN: ${getCoin('ethereum') !== undefined ? getCoin('ethereum').current_price/550:'0'} `} />
                            <Card text1="USDT Value" prize={`$${getCoin('tether') !== undefined ? getCoin('tether').current_price:'0'}`} text2={`NGN: ${getCoin('tether') !== undefined ? getCoin('tether').current_price/550:'0'} `} />
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
                        <BuySellCard type={1} action={1} onPress={() => openBuy(1)} coinStat={getCoin('bitcoin')} />
                        <BuySellCard type={2} action={1} onPress={() => openBuy(2)} coinStat={getCoin('ethereum')}/>
                        <BuySellCard type={3} action={1} onPress={() => openBuy(3)} coinStat={getCoin('tether')}/>
                    </Container>
                    }

                    {
                        tab === 2 && 
                        <Container width="100%" height="800px" paddingLeft="20px" paddingRight="20px" alignItems="flex-start" justifyContent="flex-start" marginTop="50px" bgColor={theme.light}>
                            <BuySellCard type={1} action={2} onPress={() => openSell(1)} coinStat={getCoin('bitcoin')}/>
                            <BuySellCard type={2} action={2} onPress={() => openSell(2)} coinStat={getCoin('ethereum')}/>
                            <BuySellCard type={3} action={2} onPress={() => openSell(3)} coinStat={getCoin('tether')}/>
                        </Container>
                    }

            </ScrollView>


        </View>
    )
}
