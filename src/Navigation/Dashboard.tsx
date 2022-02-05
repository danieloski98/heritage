import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Features/Dashboard/Pages/Home'
import Transactions from '../Features/Dashboard/Pages/Transactions'
import Savings from '../Features/Dashboard/Pages/Savings'
import Settings from '../Features/Dashboard/Pages/Settings'
import Navbar from '../Features/Dashboard/components/Navbar'
import { FontAwesome5 } from '@expo/vector-icons'
import { Platform, Modal, View, Text, ActivityIndicator } from 'react-native'
import { theme } from '../utils/theme';
import { useQuery } from 'react-query'
import url from '../utils/url'
import { IReturnType } from '../Types/ReturnType'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../States/UserDetails'
import { setPaypoint } from '../States/Paypoint'
import {RootState} from '../store'

const os = Platform.OS;

const Tab = createBottomTabNavigator()

const getUser = async(id: string) => {
    const request = await fetch(`${url}user/${id}`);
    const json = await request.json() as IReturnType;

    if (!request.ok) {
        throw new Error('An error occured');
    }
    return json;
}

const getPaypoint = async () => {
    const request = await fetch(`${url}paypoint`);
    const json = await request.json() as IReturnType;

    if (!request.ok) {
        throw new Error('An error occured');
    }
    return json;
}

export default function Dashboard() {
    const [loading, setLoading] = React.useState(true);

    const tokenStorage = useAsyncStorage('token');
    const idStorage = useAsyncStorage('token');
    const [id, setId] = React.useState('');
    const dispatch = useDispatch();
    const paypoint = useSelector((state: RootState) => state.paypoint);

    React.useEffect(() => {
        (async function() {
            const _id = await idStorage.getItem();
            setId(_id as string);
        })()
    })

    const userDataQuery = useQuery(['getUser', id], () => getUser(id as string), {
        onSuccess: (data) => {
            dispatch(updateUser(data.data.user));
            // setLoading(false);
        },
        onError: () => {
            setLoading(false);
        }
    });

    const paypointQuery = useQuery('getpaypoint', () => getPaypoint(), {
        onSuccess: (data) => {
            // console.log(data.data);
            dispatch(setPaypoint(data.data));
            setLoading(false);
        },
        onError: () => {
            setLoading(false);
        }
    });
  
    return (
        <>

        {/* tabs */}

        <Modal visible={loading} transparent animationType="slide" style={{ backgroundColor: 'black', justifyContent: 'center'}}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.87);', justifyContent: 'center', paddingHorizontal: 20 }}>
                <View style={{ width: '100%', height: 200, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                    <ActivityIndicator color={theme.primaryBackgroundColor} size="large" />
                    <Text style={{ fontSize: 18, marginTop: 10, fontWeight: '500' }}>Loading Details...</Text>
                </View>
            </View>
        </Modal>

        <Tab.Navigator screenOptions={{ header: ({route}) => route.name === 'settings' ? <></> : <Navbar />, tabBarStyle: { height: os === 'ios' ? 80:65, paddingBottom: os === 'ios' ? 20:10 }, tabBarLabelStyle: { fontWeight: '600', includeFontPadding: true, fontSize: 12} }}  >

            <Tab.Screen name="dashboard" component={Home} options={{ title: 'Dashboard', tabBarIcon: ({ focused }) => <FontAwesome5 name="chart-pie" size={25} color={focused ? theme.darkBlue : theme.color } />}} />

            <Tab.Screen name="transactions" component={Transactions} options={{ title: 'Transaction',  tabBarIcon: ({ focused }) => <FontAwesome5 name="th-large" size={25} color={focused ? theme.darkBlue : theme.color } />}} />

            <Tab.Screen name="savings" component={Savings} options={{ title: 'Savings', tabBarIcon: ({ focused }) => <FontAwesome5 name="piggy-bank" size={25} color={focused ? theme.darkBlue : theme.color } /> }} />

            <Tab.Screen name="settings" component={Settings} options={{ title: 'Settings', tabBarIcon: ({ focused }) => <FontAwesome5 name="cog" size={25} color={focused ? theme.darkBlue : theme.color } />}} />

        </Tab.Navigator>
    </>
    )
}
