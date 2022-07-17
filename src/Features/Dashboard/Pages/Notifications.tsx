import React, { useCallback } from 'react'
import { View, Text, ScrollView, RefreshControl, Alert, Pressable } from 'react-native'
import Navbar from '../components/Navbar'
import { Feather } from '@expo/vector-icons';
import { theme } from '../../../utils/theme';
import { useNavigation } from '@react-navigation/native'
import url from '../../../utils/url';
import { IReturnType } from '../../../Types/ReturnType';
import {useQuery} from 'react-query'
import * as moment from 'moment'
import { MotiView, AnimatePresence } from 'moti'
import * as Haptics from 'expo-haptics';
import SnackBar from 'react-native-snackbar-component'

// redux
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/index'
import { INotification } from '../../../Types/Notifications';
import { queryClient } from '../../../../App';

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
    const [showSnack, setShowSnack] = React.useState(false);

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
       return dt.startOf('milliseconds').fromNow();
        //return dt.startOf('seconds').fromNow();
    }
    const navigate = useCallback(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        navigation.goBack()
    }, []);

    const deleteNoti = useCallback(async (id: string) => {
        const request = await fetch(`${url}notifications/${id}`, {
            method: 'delete',
        });
        const json = await request.json() as IReturnType;
        if (json.statusCode !== 200) {
            Alert.alert('Error', json.errorMessage);
            return;
        } else {
            setShowSnack(true);
            queryClient.invalidateQueries();
            return;
        }
    }, []);
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            {/* navbar  */}
            <Navbar />

            {/* snackbar */}
            <SnackBar visible={showSnack} textMessage="Notification Deleted" actionHandler={()=>{setShowSnack(false)}} actionText="Close" />

            <View style={{ flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', paddingTop: 20 }}>
                <Feather name="arrow-left" size={30} color={theme.color} onPress={navigate} />
                <Text style={{ marginLeft: 20, fontSize: 16, fontFamily: 'Inter-Bold' }}>Notifications</Text>
            </View>

            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} colors={[theme.primaryBackgroundColor]} tintColor={theme.primaryBackgroundColor} />} style={{ paddingHorizontal: 20, marginTop: 20, marginBottom: 20 }}>

                {
                    !error && !refreshing && noti.length < 1 && (
                        <View style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{ fontSize: 18, fontFamily: 'Inter-Regular' }}>You have no new notification</Text>
                        </View>
                    ) 
                }
                <AnimatePresence>
                {
                    !error && !refreshing && noti.length > 0 && noti.map((item, index) => (
                        <MotiView 
                        from={{ opacity: 0, top: 300 }}
                        animate={{ opacity: 1, top: 0 }}
                        exit={{ opacity: 0, top: 200 }}
                        transition={{
                          delay: parseInt(`${index}00`),
                          type: 'spring',
                        }}
                        key={index.toString()} 
                        style={{ width: '100%', height: 120, backgroundColor: theme.light, justifyContent: 'center', marginBottom: 20, elevation: 2 }}>
                            <View style={{ width: '100%', height: '90%', borderLeftColor: theme.primaryBackgroundColor, borderLeftWidth: 5, justifyContent: 'center', paddingHorizontal: 20, flexDirection: 'row' }}>
                                <View style={{ justifyContent: 'center', paddingHorizontal: 20, }}>
                                    <Text style={{ fontSize: 16, fontFamily: 'Inter-Regular' }}>{item.message}</Text>
                                    <Text style={{ fontSize: 14, fontFamily: 'Inter-Light', marginTop: 20, color: 'grey' }}>{new Date(item.createdAt).toDateString()}</Text>
                                </View>
                                <Pressable onPress={() => deleteNoti(item._id)} style={{ width: 50, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Feather name="trash-2" size={25} color={theme.primaryBackgroundColor} />
                                </Pressable>
                            </View>
                        </MotiView>
                    ))
                }
                </AnimatePresence>
               

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
