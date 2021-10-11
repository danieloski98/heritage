import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { theme } from '../../../utils/theme'
import * as ImagePicker from 'expo-image-picker';
import { IMageType } from '../BuyModal';


interface IProps {
    nextStep: Function;
    setImage: Function;
    image: Array<IMageType>;
}

export default function UploadFiles({ nextStep, image, setImage }: IProps) {

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
       });

       if (data.cancelled) {
           return;
       }

       // added the image
       const request = await fetch(data.uri);
       const blob = await request.blob();
       // construct object 
       const newObj = {...data, name: blob['_data'].name, type: blob['_data'].type};
      setImage([...image, newObj])

      nextStep(4);
    }

    return (
        <View style={{ flex: 1 }}>
           <View style={{ width: '100%', borderRadius: 10, borderWidth: 2, borderStyle: 'dashed', borderColor: 'grey', height: 250, marginTop: 30 }}>
               <Pressable onPress={pick} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="cloud-upload" color={theme.color} size={60} />
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 5 }}>Tap to upload a file here</Text>
                <Text style={{ fontSize: 16, color: 'grey', marginTop: 5 }}>Supports JPG and PNG</Text>
               </Pressable>
           </View>
        </View>
    )
}
