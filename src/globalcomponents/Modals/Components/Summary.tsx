import React from 'react'
import { View, Text, ScrollView, Pressable, Platform } from 'react-native'
import { theme } from '../../../utils/theme'
import { FontAwesome5 } from '@expo/vector-icons'
import Container from '../../Container'
import Button from '../../Button';
import { IMageType } from '../BuyModal'
import * as ImagePicker from 'expo-image-picker';

interface IProps {
    nextStep: Function;
    setImage: Function;
    images: Array<IMageType>;
}

export default function Summary({images, nextStep, setImage}: IProps) {

    const pick = async() => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('We need permission to acess your gallery');
            return;
        }
 
        // pick file
        const data = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 4,
            aspect: [4, 3],
            base64: false
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
 
       nextStep(4);
     }

    return (
        <View style={{ flex: 1 }}>

            {/* picked files section */}

            <View style={{ width: '100%', height: 150, marginTop: 20 }}>
                <ScrollView style={{}} horizontal={false}>
                    
                    {
                        images.map((item, index) => (
                            <View style={{ width: '100%', height: 50, backgroundColor: theme.light, marginVertical: 5, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                                <FontAwesome5 name="file-alt" size={30} color={theme.color} />
                                <Text style={{ fontSize: Platform.OS === 'ios' ? 14:16, fontWeight: Platform.OS === 'ios' ? '500':'bold', width: '80%', textAlign: 'center' }}>{item.name}</Text>
                                <Pressable style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(189, 99, 99, 0.226)', justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesome5 name="times" size={20} color="red" />
                                </Pressable>
                            </View>
                        ))
                    }

                </ScrollView>
            </View>

            <View style={{ alignItems: 'flex-end'}}>
                <Text onPress={pick} style={{ color: '#1526A7', fontSize: Platform.OS === 'ios' ? 14:16, fontWeight: Platform.OS === 'ios' ? '500':'bold' }}>+ Add Another ScreenShot</Text>
            </View>

            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: Platform.OS === 'ios' ? 14:16, }}>Recieving Address</Text>
                <View style={{ width: '100%', height: 50, backgroundColor: theme.light, marginVertical: 5, borderRadius: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 10 }}>
                        <Text>0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7</Text>
                </View>
                <Text style={{ fontSize: Platform.OS === 'ios' ? 14:16, color: 'red', marginTop: 10 }}>Please make sure your address is correct as Heritage exchange won't be held responsible for any error from your end.</Text>
            </View>

            <Container width="100%" height="55px" alignItems="flex-start" marginTop="20px">
                    <Button>
                    <Pressable style={{ flex: 1, justifyContent: 'center', backgroundColor: theme.primaryBackgroundColor, width: '100%', borderRadius: 10, alignItems: 'center' }} onPress={() => nextStep(5)}>
                        <Text style={{ color: 'white' }}>Submit</Text>
                    </Pressable>
                    </Button>
            </Container>

        </View>
    )
}
