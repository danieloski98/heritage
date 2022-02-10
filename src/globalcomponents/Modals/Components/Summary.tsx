import React from 'react'
import { View, Text, ScrollView, Pressable, Platform, Alert, ActivityIndicator } from 'react-native'
import { theme } from '../../../utils/theme'
import { FontAwesome5 } from '@expo/vector-icons'
import Container from '../../Container'
import Button from '../../Button';
import { IMageType } from '../BuyModal'
import * as ImagePicker from 'expo-image-picker';

// redux
import {} from '../../../States/UserDetails'
import { RootState } from '../../../store'
import { useSelector } from 'react-redux'

interface IProps {
    nextStep: Function;
    setImage: Function;
    images: Array<IMageType>;
    action: number;
    coinType: number;
    onpress: Function;
}

export default function Summary({nextStep, images, setImage, action, coinType, onpress }: IProps) {
    const [loading, setLoading] = React.useState(false);
        // redux
    const user = useSelector((state: RootState) => state.userdetail.user);

    const pick = async() => {
        if (images.length >= 5) {
            Alert.alert('Message', 'You can only pick 5 images');
            return;
        }
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('We need permission to acess your gallery');
            return;
        }
 
        // pick file
        const data = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
        });
 
        if (data.cancelled) {
            return;
        }
 
        // added the image
        const request = await fetch(data.uri);
        const blob = await request.blob();
        // construct object 
        const newObj = {...data, name: blob['_data'].name, type: blob['_data'].type};
       setImage([...images, newObj])
     }

     const deleteImg = (index: number) => {
         const img = images.splice(index, 1);
         const newImgs = [...images];
         setImage(newImgs);
     }

     const wallet = () => {
         switch(coinType) {
             case 1: {
                 return `${user.bitcoin_wallet} - BTC`;
             }
             case 2: {
                 return `${user.ethereum_wallet} - ETH`;
             }
             case 3: {
                 return `${user.usdt_wallet} - USDT`;
             }
         }
     }

     const submit = async () => {
         setLoading(true);
         await onpress();
         setLoading(false);
     }
    return (
        <View style={{ flex: 1 }}>

            {/* picked files section */}

            <View style={{ width: '100%', height: 180, marginTop: 20 }}>
                <ScrollView style={{}} horizontal={false}>
                    
                    {
                        images.map((item, index) => (
                            <View key={index.toString()} style={{ width: '100%', height: 50, backgroundColor: theme.light, marginVertical: 5, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                                <FontAwesome5 name="file-alt" size={25} color={theme.color} />
                                <Text style={{ fontSize: Platform.OS === 'ios' ? 14:14, fontFamily: 'Inter-Regular', width: '80%', textAlign: 'center', paddingHorizontal: 10 }}>{item.name}</Text>
                                <Pressable style={{ width: 25, height: 25, borderRadius: 15, backgroundColor: 'rgba(189, 99, 99, 0.226)', justifyContent: 'center', alignItems: 'center' }} onPress={() => deleteImg(index)}>
                                    <FontAwesome5 name="times" size={15} color="red" />
                                </Pressable>
                            </View>
                        ))
                    }

                    {
                        images.length < 5 && (
                            <View style={{ alignItems: 'flex-end', marginTop: 20, height: 20 }}>
                                <Text onPress={pick} style={{ color: '#1526A7', fontSize: Platform.OS === 'ios' ? 14:16, fontFamily: 'Inter-SemiBold' }}>+ Add Another ScreenShot</Text>
                            </View>
                        )
                    }

                </ScrollView>
            </View>

            {/* <View style={{ alignItems: 'flex-end'}}>
                <Text onPress={pick} style={{ color: '#1526A7', fontSize: Platform.OS === 'ios' ? 14:16, fontWeight: Platform.OS === 'ios' ? '500':'bold' }}>+ Add Another ScreenShot</Text>
            </View> */}

            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: Platform.OS === 'ios' ? 14:16, fontFamily: 'Inter-SemiBold' }}>Recieving {action === 1 ? 'Wallet Address': 'Account'}</Text>
                <View style={{ width: '100%', height: 50, backgroundColor: theme.light, marginVertical: 5, borderRadius: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 10 }}>
                        {action > 1 && (
                            <Text style={{ fontFamily: 'Inter-SemiBold'}}>{user.account_number} - {user.bank_name}</Text>
                        )}
                        {
                            action === 1 && (
                                <Text style={{ fontFamily: 'Inter-SemiBold'}}>{wallet()}</Text>
                            )
                        }
                </View>
                <Text style={{ fontSize: Platform.OS === 'ios' ? 14:16, color: 'red', marginTop: 10, fontFamily: 'Inter-Bold' }}>Please make sure your account details are correct as Heritage exchange won't be held responsible for any error from your end.</Text>
            </View>

            <Container width="100%" height="55px" alignItems="flex-start" marginTop="20px">
                    <Button>
                        <Pressable style={{ flex: 1, justifyContent: 'center', backgroundColor: theme.primaryBackgroundColor, width: '100%', borderRadius: 10, alignItems: 'center' }} onPress={submit}>
                            {loading && <ActivityIndicator size="small" color="white" />}
                            {!loading && <Text style={{ color: 'white', fontFamily: 'Inter-SemiBold' }}>Submit</Text>}
                        </Pressable>
                    </Button>
            </Container>

        </View>
    )
}
