import React from 'react'
import { View, Text, ScrollView, RefreshControl, Platform, Pressable } from 'react-native'
import { theme } from '../../../utils/theme'
import {Ionicons} from '@expo/vector-icons'
import TransactionCard from '../components/TransactionCard';

export default function Transactions() {
    const [tab, setTab] = React.useState(2);
    const os = Platform.OS;
    return (
        <View style={{ flex: 1 }}>
            <View style={{ padding: 20 }}>

                <View style={{ width: '100%', height: '100%', borderRadius: 10, backgroundColor: 'white' }}>

                    {/* tabbar */}

                    <View style={{ width: '100%', height: 60, flexDirection: 'row', borderBottomColor: 'lightgrey', borderBottomWidth: 1, paddingHorizontal: 20 }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderBottomColor: tab== 1 ? theme.primaryBackgroundColor: 'transparent', borderBottomWidth: 4, marginHorizontal: 0 }}>
                            <Pressable onPress={()=> setTab(1)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                <Text style={{ fontWeight: os === 'ios' ? '600':'bold'}} onPress={()=> setTab(1)} >Cryptocurrency</Text>
                            </Pressable>
                        </View>
                        <View style={{ flex: 1, borderBottomColor: tab== 2 ? theme.primaryBackgroundColor: 'transparent', borderBottomWidth: 4, marginHorizontal: 0 }}>
                            <Pressable onPress={()=> setTab(2)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                <Text style={{ fontWeight: os === 'ios' ? '600':'bold'}} >FIAT</Text>
                            </Pressable>
                        </View>
                    </View>

                    {/* date picker */}
                    <View style={{ width: '90%', height: 60, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, backgroundColor:theme.light, marginHorizontal: 20, alignSelf: 'center', marginTop: 20, borderRadius: 10 }}>
                        <Ionicons name="calendar" size={30} color={theme.color} />
                        <Text style={{ marginLeft: 20, fontSize: 16 }}>19/06/2021 - 21/06/2021</Text>
                    </View>

                    <ScrollView style={{ marginVertical: 20 }}>
                        <TransactionCard />
                        <TransactionCard />
                        <TransactionCard />
                        <TransactionCard />
                        <TransactionCard />
                        <TransactionCard />
                    </ScrollView>
                </View>

            </View>
        </View>
    )
}
