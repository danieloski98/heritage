import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Features/Dashboard/Pages/Home'
import Transactions from '../Features/Dashboard/Pages/Transactions'
import Savings from '../Features/Dashboard/Pages/Savings'
import Settings from '../Features/Dashboard/Pages/Settings'
import Navbar from '../Features/Dashboard/components/Navbar'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { Platform, Modal, View, Text, ActivityIndicator } from 'react-native'
import { theme } from '../utils/theme';
import { useQuery } from 'react-query'
import url from '../utils/url'
import { IReturnType } from '../Types/ReturnType'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import {useNavigation} from '@react-navigation/native'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../States/UserDetails'
import { setPaypoint } from '../States/Paypoint'
import {RootState} from '../store'
import NewsHome from '../Features/Dashboard/Pages/markets'

// components
import Profile from '../Features/Dashboard/Pages/Profile';
import Notifications from '../Features/Dashboard/Pages/Notifications';
import Security from '../Features/Dashboard/Pages/Security'
import Wallets from '../Features/Dashboard/Pages/Wallets';
import About from '../Features/Dashboard/Pages/About'
import Terms from '../Features/Dashboard/Pages/Terms';
import Support from '../Features/Dashboard/Pages/Support';
import Pin from '../Features/Authentication/Pages/Pin';
import coin from '../Features/Dashboard/Pages/coin';

const os = Platform.OS;

const Tab = createBottomTabNavigator()
const { Navigator, Screen, Group } = createNativeStackNavigator()

const getUser = async(id: string) => {
    const request = await fetch(`${url}user/${id}`);
    const json = await request.json() as IReturnType;

    if (!request.ok) {
        throw new Error('An error occured while getting the user');
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

function Dashboard() {
    const [loading, setLoading] = React.useState(true);

    const tokenStorage = useAsyncStorage('token');
    const idStorage = useAsyncStorage('id');
    const [id, setId] = React.useState('');
    const dispatch = useDispatch();
    const paypoint = useSelector((state: RootState) => state.paypoint);

    const navigation = useNavigation<any>();

    React.useEffect(() => {
        (async function() {
            const _id = await idStorage.getItem();
            if (id === null) {
                navigation.navigate('home');
            }
            setId(_id as string);
        })()
    })

    const userDataQuery = useQuery(['getUser', id], () => getUser(id as string), {
        enabled: id !== null,
        onSuccess: (data) => {
            dispatch(updateUser(data.data.user));
            // setLoading(false);
        },
        onError: () => {
            setLoading(false);
            navigation.navigate('login');
        }
    });

    const paypointQuery = useQuery('getpaypoint', () => getPaypoint(), {
        onSuccess: (data) => {
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

            <Tab.Screen name="dashboard" component={Home} options={{ title: 'Home', tabBarIcon: ({ focused }) => <FontAwesome5 name="chart-pie" size={25} color={focused ? theme.primaryBackgroundColor : theme.color } />}} />

            <Tab.Screen name="transactions" component={Transactions} options={{ title: 'Transaction',  tabBarIcon: ({ focused }) => <FontAwesome5 name="th-large" size={25} color={focused ? theme.primaryBackgroundColor : theme.color } />}} />

            <Tab.Screen name="markets" component={NewsHome} options={{ title: 'Markets',  tabBarIcon: ({ focused }) => <Ionicons name="stats-chart" size={25} color={focused ? theme.primaryBackgroundColor : theme.color } />}} />

            {/* <Tab.Screen name="savings" component={Savings} options={{ title: 'Savings', tabBarIcon: ({ focused }) => <FontAwesome5 name="piggy-bank" size={25} color={focused ? theme.primaryBackgroundColor : theme.color } /> }} /> */}

            <Tab.Screen name="settings" component={Settings} options={{ title: 'Settings', tabBarIcon: ({ focused }) => <FontAwesome5 name="cog" size={25} color={focused ? theme.primaryBackgroundColor : theme.color } />}} />

        </Tab.Navigator>
    </>
    )
}


export default function DashboardStack() {
    return (
        <Navigator initialRouteName='index' screenOptions={{ headerShown: false }}>
            <Group>
                <Screen name="index" component={Dashboard} />
            </Group>
            <Group>
                <Screen name="coin" component={coin}  />
                <Screen name="pin" component={Pin} />
                <Screen name="profile" component={Profile} />
                <Screen name="notifications" component={Notifications} />
                <Screen name="wallets" component={Wallets} />
                <Screen name="security" component={Security} />
                <Screen name="about" component={About} />
                <Screen name="terms" component={Terms} />
                <Screen name="support" component={Support} />
            </Group>
        </Navigator>
    )
}