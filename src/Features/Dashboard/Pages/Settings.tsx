import React from 'react'
import { View, TextInput, Pressable, StatusBar, Image, TouchableOpacity } from 'react-native'
import Button from '../../../globalcomponents/Button'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { theme } from '../../../utils/theme'
import { Feather, Ionicons } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

// redux
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/index'

export default function Settings() {
    const [showing, setShowing] = React.useState(false);
    const navigation = useNavigation<any>();
    const user = useSelector((state: RootState) => state.userdetail.user);

    const icon = `https://avatars.dicebear.com/api/human/${user.email}.png`;

    return (
        <View style={{ flex: 1 }}>

            <StatusBar translucent />

            <ScrollView style={{ flex: 1, paddingBottom: 0, backgroundColor: 'white' }}>
            <View style={{ width: '100%', height: 300, backgroundColor: theme.darkBlue, padding: 25 }}>
                <Text style={{ fontSize: 20, fontFamily: 'Inter-Bold', color:'white', marginTop: 20 }}>Settings</Text>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{ width: 100, height: 100}}>
                        <Image source={{ uri: icon }} resizeMode="contain" style={{ width: '100%', height: '100%', borderRadius: 60 }} />
                    </View>
                    <Text style={{ fontSize: 18, fontFamily: 'Inter-SemiBold', color:'white', marginTop: 10 }}>{user.first_name} {user.last_name}</Text>
                    <Text style={{ fontSize: 16, fontFamily: 'Inter-Light', color:'white', marginBottom: 20 }}>{user.email}</Text>
                </View>
               
            </View>

            <View style={{ width: '95%', padding: 20, marginHorizontal: 10, backgroundColor: 'white', transform: [
                {translateY: -40}
            ], borderTopLeftRadius: 10, borderTopRightRadius: 10, borderWidth: 1, borderColor: 'lightgrey' }}>

                <TouchableOpacity onPress={() => navigation.navigate('profile')} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 40 }}>
                    <View style={{ width: 40, height: 40 }}>
                        <Image source={require('../../../../assets/icons/profile.png')} resizeMode="contain" style={{ width: '100%', height: '100%'}} />
                    </View>
                    <Text style={{ fontSize: 18, fontFamily: 'Inter-SemiBold', marginLeft: 16, color: 'black' }}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('wallets')} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 40 }}>
                    <View style={{ width: 40, height: 40 }}>
                        <Image source={require('../../../../assets/icons/wallet.png')} resizeMode="contain" style={{ width: '100%', height: '100%'}} />
                    </View>
                    <Text style={{ fontSize: 18, fontFamily: 'Inter-SemiBold', marginLeft: 16, color: 'black' }}>Wallets & Bank</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('security')} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 40 }}>
                    <View style={{ width: 40, height: 40 }}>
                        <Image source={require('../../../../assets/icons/security.png')} resizeMode="contain" style={{ width: '100%', height: '100%'}} />
                    </View>
                    <Text style={{ fontSize: 18, fontFamily: 'Inter-SemiBold', marginLeft: 16, color: 'black' }}>Security</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 40 }}>
                    <View style={{ width: 40, height: 40 }}>
                        <Image source={require('../../../../assets/icons/support.png')} resizeMode="contain" style={{ width: '100%', height: '100%'}} />
                    </View>
                    <Text style={{ fontSize: 18, fontFamily: 'Inter-SemiBold', marginLeft: 16, color: 'black' }}>Support</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('about')} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 40 }}>
                    <View style={{ width: 40, height: 40 }}>
                        <Image source={require('../../../../assets/icons/about.png')} resizeMode="contain" style={{ width: '100%', height: '100%'}} />
                    </View>
                    <Text style={{ fontSize: 18, fontFamily: 'Inter-SemiBold', marginLeft: 16, color: 'black' }}>About App</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 40 }}>
                    <View style={{ width: 40, height: 40 }}>
                        <Image source={require('../../../../assets/icons/terms.png')} resizeMode="contain" style={{ width: '100%', height: '100%'}} />
                    </View>
                    <Text style={{ fontSize: 18, fontFamily: 'Inter-SemiBold', marginLeft: 16, color: 'black' }}>Terms & Conditions</Text>
                </TouchableOpacity>

            </View>

           
            </ScrollView>
        </View>
    )
}
