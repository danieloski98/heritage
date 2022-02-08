import React from 'react'
import { View, Text, ScrollView, RefreshControl } from 'react-native'
import Navbar from '../components/Navbar'
import { Feather } from '@expo/vector-icons';
import { theme } from '../../../utils/theme';
import { useNavigation } from '@react-navigation/native'
import url from '../../../utils/url';
import { IReturnType } from '../../../Types/ReturnType';
import {useQuery} from 'react-query'
import * as moment from 'moment'

// redux
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/index'
import { INotification } from '../../../Types/Notifications';

const getNoti = async (id: string) => {
    const request = await fetch(`${url}notifications/user/${id}`);
    const json = await request.json() as IReturnType;
    if (!request.ok) {
        throw new Error('An error occured while trying to fetch notifications');
    }
    return json;
}

export default function Notifications() {
    const [refreshing, setRefreshing] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [noti, setNoti] = React.useState([] as Array<INotification>);

    const user = useSelector((state: RootState) => state.userdetail.user);
    const {refetch} = useQuery(['getnotification', user._id], () => getNoti(user._id), {
        onSuccess: (data) => {
            setNoti(data.data);
            setRefreshing(false);
        },
        onError: () => {
            setRefreshing(false);
            setError(true);
        }
    })

    const navigation = useNavigation();

    const refresh = async() => {
        setRefreshing(true);
        await refetch();
    }

    const getDate = (date: string) => {
        const dt = moment.default(date);
        return dt.startOf('minutes').fromNow();
    }
    return (
        <View style={{ flex: 1, backgroundColor: theme.light }}>

            {/* navbar  */}

            <Navbar />
            <View style={{ flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', paddingTop: 20 }}>
                <Feather name="arrow-left" size={30} color={theme.color} onPress={() => navigation.goBack()} />
                <Text style={{ marginLeft: 20, fontSize: 16 }}>Notifications</Text>
            </View>

            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} colors={[theme.primaryBackgroundColor]} tintColor={theme.primaryBackgroundColor} />} style={{ paddingHorizontal: 20, marginTop: 20, marginBottom: 20 }}>

                {
                    !error && !refreshing && noti.length < 1 && (
                        <View style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center'}}>
                            <Text>You have no new notification</Text>
                        </View>
                    ) 
                }
                {
                    !error && !refreshing && noti.length > 0 && noti.map((item, index) => (
                        <View key={index.toString()} style={{ width: '100%', height: 120, backgroundColor: 'white', justifyContent: 'center', marginBottom: 20 }}>
                            <View style={{ width: '100%', height: '90%', borderLeftColor: theme.primaryBackgroundColor, borderLeftWidth: 5, justifyContent: 'center', paddingHorizontal: 20 }}>
                                <Text style={{ fontSize: 16, fontWeight: '500' }}>{item.message}</Text>
                                <Text style={{ fontSize: 14, fontWeight: '200', marginTop: 20, color: 'grey' }}>{getDate(item.createdAt)}</Text>
                            </View>
                        </View>
                    ))
                }
               

                {/* <View style={{ width: '100%', height: 120, backgroundColor: 'white', justifyContent: 'center', marginBottom: 20 }}>
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
                </View> */}
            </ScrollView>
            
        </View>
    )
}
