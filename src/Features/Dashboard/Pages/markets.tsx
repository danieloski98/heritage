import {useState} from 'react'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image, RefreshControl, ScrollView, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import {theme} from '../../../utils/theme'
import { ICoin } from '../../../types/CoinType';
import {useQuery} from 'react-query';
import { COINGECKO_URL } from '../../../utils/url';
import {Feather, FontAwesome5} from '@expo/vector-icons'
import { currencyFormatterD } from '../../../utils/currencyConverter';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { Icon } from '@ui-kitten/components';
import Charts from '../components/Charts';

const getCoins = async () => {
    const request = await fetch(`${COINGECKO_URL}coins/markets?vs_currency=usd&sparkline=true&price_change_percentage=7d`);
    const json = await request.json() as Array<ICoin>;
  
    if (!request.ok) {
      throw new Error('An error occured while getting the coins');
    }
    return json;
}

const CATS = [
  'Cryptocurrency',
  'Category',
  'Exchanges',
  'Derivaties'
];

export default function NewsHome (props: any) {
  const [data, setData] = useState([] as Array<ICoin>);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [active, setActive] = useState('Cryptocurrency');
  const [coin, setCoin] = useState({} as ICoin);

  // bottomsheet
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const snapPoints = React.useMemo(() => ['60%'], [])

  // get coins query
  const coinQuery = useQuery('getCoins', getCoins, {
    onSuccess: (dd) => {
      setData(dd);
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      setError(true);
    }
  });

  const onRefresh = async() => {
    setLoading(true);
    await coinQuery.refetch();
  }

  const openBottomSheet = (item: ICoin) => {
    setCoin(item);
    bottomSheetRef.current?.present();
  }

  const Header = () => (
    <View style={{ width: '100%', marginHorizontal: 20, marginTop: 0, paddingBottom: 0 }}>
      <View style={{ width: '90%', height: 70, paddingHorizontal: 0, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
        <Text style={{ color: theme.textColor, fontSize: 22, fontWeight: '700', marginTop: 0 }}>Markets</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0 }}>
          {/* <FontAwesome5 name="search" color="grey" size={25} style={{ marginRight: 40 }} />  
          <FontAwesome5 name="user" color="grey" size={25} />   */}
        </View>
      </View>
      {/* <View style={{ width: '100%', height: 40 }}>
        <ScrollView horizontal>
          {CATS.map((item, index) => (
            <TouchableOpacity onPress={() => setActive(item)} key={index.toString()} style={{ height: '100%', borderRadius: 40, padding: 8, borderWidth: active === item ? 0 : 1, borderColor: theme.inactive , justifyContent: 'center', alignItems: 'center', marginRight: 20, backgroundColor: active === item ? theme.themeColor: theme.primaryBgColor }}>
              <Text style={{ color: active === item ? 'white': theme.darkenTextColor }}>{item}</Text>  
            </TouchableOpacity> 
          ))} 
        </ScrollView>  
      </View> */}
    </View>
  )

  const chevron = (value: number) => {
    if (value < 0) {
      return <FontAwesome5 name="caret-down" color="red" size={18} style={{ marginRight: 5,}} />
    } else {
      return <FontAwesome5 name="caret-up" color="green" size={18} style={{ marginRight: 5,}} />
    }
  }

  const percentageColor = (p: number) => {
    if (p > 0) {
      return 'green';
    } else {
      return 'red';
    }
  }
  return (
    <BottomSheetModalProvider>
         <View style={{ flex: 1, backgroundColor: theme.primaryBgColor }}>

      <Header />
      {!loading && !error && (
          <FlatList 
          data={data} 
          keyExtractor={(item: ICoin, index) => item.id} 
          refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={loading} progressViewOffset={50} />}
          renderItem={({item,index, separators}) => (
            <>
              {loading && 
              <View style={{ width: '100%', alignItems: 'center', paddingTop: 20 }}>
                <ActivityIndicator color="white" size="large" />
              </View>}
                <TouchableOpacity 
                onPress={() => openBottomSheet(item)}
                style={{ paddingHorizontal: 20, height: 70, flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
    
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: item.image }} resizeMode="contain" style={{ width: 40, height: 40 }} />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={{ fontSize: 16, color: theme.textColor, fontWeight: '700' }}>{item.name}</Text>
                      <Text style={{ fontSize: 14, color: theme.darkText, fontWeight: '300', textTransform: 'uppercase', marginTop: 5 }}>{item.symbol}</Text>
                    </View>
                  </View>
    
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 16, color: theme.textColor, fontWeight: '700' }}>${currencyFormatterD(item.current_price)}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                      {chevron(item.price_change_percentage_24h)}
                      <Text style={{ fontSize: 14, color: percentageColor(item.price_change_percentage_24h), fontWeight: '600', textTransform: 'uppercase'  }}>{item.price_change_percentage_24h.toFixed(2)}</Text>  
                    </View>
                  </View>
                  
                </TouchableOpacity>
            </>
          )} />
      )}
       {!loading && error && (
            <View style={{ width: '100%', height: 150, justifyContent: 'center', alignItems: 'center' }}>
              <Text>An Error occured</Text>
              <Pressable style={{ width: 60, height: 40, backgroundColor: theme.primaryBgColor,}}></Pressable>
            </View>
          )}
      {/* bottom sheet */}
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        style={style.bottomshetParent}
      >
        <Charts coin={coin} />
    
      </BottomSheetModal>
    </View>
    </BottomSheetModalProvider>
  )
}

const style = StyleSheet.create({
  bottomshetParent: {
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {height: -4, width: 0},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  }
});