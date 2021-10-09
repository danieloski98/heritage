import React from 'react'
import { View, Text, ScrollView, RefreshControl } from 'react-native'
import Navbar from '../components/Navbar'
import { Feather } from '@expo/vector-icons';
import { theme } from '../../../utils/theme';
import { useNavigation } from '@react-navigation/native'

export default function Notifications() {
    const [refreshing, setRefreshing] = React.useState(false);

    const navigation = useNavigation();

    const refresh = () => {
        setRefreshing(true);
        const timer = setTimeout(() => {
            setRefreshing(false);
            clearTimeout(timer);
        }, 6000);
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#EFF7FF' }}>

            {/* navbar  */}

            <Navbar />
            <View style={{ flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', paddingTop: 20 }}>
                <Feather name="arrow-left" size={30} color={theme.color} onPress={() => navigation.goBack()} />
                <Text style={{ marginLeft: 20, fontSize: 16 }}>Notifications</Text>
            </View>

            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} colors={[theme.primaryBackgroundColor]} tintColor={theme.primaryBackgroundColor} />} style={{ paddingHorizontal: 20, marginTop: 20, marginBottom: 20 }}>
                <View style={{ width: '100%', height: 120, backgroundColor: 'white', justifyContent: 'center', marginBottom: 20 }}>
                    <View style={{ width: '100%', height: '90%', borderLeftColor: theme.primaryBackgroundColor, borderLeftWidth: 5, justifyContent: 'center', paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Your Transaction is processing. This might take a couple of minutes</Text>
                        <Text style={{ fontSize: 14, fontWeight: '200', marginTop: 20, color: 'grey' }}>7.30PM | June 21, 2021</Text>
                    </View>
                </View>

                <View style={{ width: '100%', height: 120, backgroundColor: 'white', justifyContent: 'center', marginBottom: 20 }}>
                    <View style={{ width: '100%', height: '90%', borderLeftColor: theme.primaryBackgroundColor, borderLeftWidth: 5, justifyContent: 'center', paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Your Transaction is processing. This might take a couple of minutes</Text>
                        <Text style={{ fontSize: 14, fontWeight: '200', marginTop: 20, color: 'grey' }}>7.30PM | June 21, 2021</Text>
                    </View>
                </View>

                <View style={{ width: '100%', height: 120, backgroundColor: 'white', justifyContent: 'center', marginBottom: 20 }}>
                    <View style={{ width: '100%', height: '90%', borderLeftColor: theme.primaryBackgroundColor, borderLeftWidth: 5, justifyContent: 'center', paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Your Transaction is processing. This might take a couple of minutes</Text>
                        <Text style={{ fontSize: 14, fontWeight: '200', marginTop: 20, color: 'grey' }}>7.30PM | June 21, 2021</Text>
                    </View>
                </View>

                <View style={{ width: '100%', height: 120, backgroundColor: 'white', justifyContent: 'center', marginBottom: 20 }}>
                    <View style={{ width: '100%', height: '90%', borderLeftColor: theme.primaryBackgroundColor, borderLeftWidth: 5, justifyContent: 'center', paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Your Transaction is processing. This might take a couple of minutes</Text>
                        <Text style={{ fontSize: 14, fontWeight: '200', marginTop: 20, color: 'grey' }}>7.30PM | June 21, 2021</Text>
                    </View>
                </View>

                <View style={{ width: '100%', height: 120, backgroundColor: 'white', justifyContent: 'center', marginBottom: 20 }}>
                    <View style={{ width: '100%', height: '90%', borderLeftColor: theme.primaryBackgroundColor, borderLeftWidth: 5, justifyContent: 'center', paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Your Transaction is processing. This might take a couple of minutes</Text>
                        <Text style={{ fontSize: 14, fontWeight: '200', marginTop: 20, color: 'grey' }}>7.30PM | June 21, 2021</Text>
                    </View>
                </View>

                <View style={{ width: '100%', height: 120, backgroundColor: 'white', justifyContent: 'center', marginBottom: 20 }}>
                    <View style={{ width: '100%', height: '90%', borderLeftColor: theme.primaryBackgroundColor, borderLeftWidth: 5, justifyContent: 'center', paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Your Transaction is processing. This might take a couple of minutes</Text>
                        <Text style={{ fontSize: 14, fontWeight: '200', marginTop: 20, color: 'grey' }}>7.30PM | June 21, 2021</Text>
                    </View>
                </View>
            </ScrollView>
            
        </View>
    )
}
