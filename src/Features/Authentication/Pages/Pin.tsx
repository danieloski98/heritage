import React, { useRef, useState } from 'react'
import { View, TextInput, Pressable, ScrollView, ActivityIndicator, Alert, Platform, Image } from 'react-native'
import Button from '../../../globalcomponents/Button'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { theme } from '../../../utils/theme'
import { Ionicons } from '@expo/vector-icons'
import * as yup from 'yup'
import { useFormik } from 'formik'
import url from '../../../utils/url'
import { IReturnType } from '../../../Types/ReturnType'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

// redux
import { RootState } from '../../../store'
import {updateUser, updateToken} from '../../../States/UserDetails'
import { useDispatch, useSelector } from 'react-redux'


export default function Pin(props) {
    const [showing, setShowing] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const user = useSelector((state: RootState) => state.userdetail.user);
    const tokenStorage = useAsyncStorage('token');
    const pinStorage = useAsyncStorage('pin');
    const pinSetStorage = useAsyncStorage('pinSet');
    const idStorage = useAsyncStorage('id');

    // values
    const [v1, setV1] = useState('');
    const [v2, setV2] = useState('');
    const [v3, setV3] = useState('');
    const [v4, setV4] = useState('');

    // refs
    const refOne = useRef(TextInput as any);
    const refTwo = useRef(TextInput as any);
    const refThree = useRef(TextInput as any);
    const refFour = useRef(TextInput as any);

    const checker = (p: number, value: string) => {
        console.log(typeof value);
        switch(p){
            case 1: {
                setV1('');
                setV1(value);
                refTwo.current.focus();
                break;
            } case 2: {
                setV2('');
                setV2(value);
                refThree.current.focus();
                break;
            }
            case 3: {
                setV3('');
                setV3(value);
                refFour.current.focus();
                break;
            }
            case 4: {
                // setV1('');
                setV4(value);
                refFour.current.blur();
                break;
            }
        }
        const val = `${v1}${v2}${v3}${v4}`;
        // console.log(val);
    }

    const submit = async () => {
        setLoading(true);
        const val = `${v1}${v2}${v3}${v4}`;
        const id = await idStorage.getItem();
        const request = await fetch(`${url}user/pin/${user._id}`, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ pin: val }),
        });
        const json = await request.json() as IReturnType;
        setLoading(false);
        if (json.statusCode !== 200) {
            Alert.alert('Error', json.errorMessage);
            return
        } else {
            Alert.alert('Success', json.successMessage);
            pinStorage.setItem(val);
            props.navigation.navigate('index');
            return;
        }
       
      }


    return (
       <View style={{ flex: 1, backgroundColor: theme.darkBlue }}>

           <View style={{ flex: 0.15, backgroundColor: theme.darkBlue, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
               <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={{ fontWeight: Platform.OS === 'ios' ? '600':'bold', fontSize: 25, color: 'white' }}>Heritage</Text>
                    <Text style={{ fontWeight: '300', fontSize: 25, color: 'white', marginLeft: 5 }}>Exchange</Text>
               </View>
               <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Image source={require('../../../../assets/crypto/BTC.png')} resizeMode="contain" style={{ width: '30%', height: '100%', left: 100, bottom: -70, position: 'absolute' }} />
                    <Image source={require('../../../../assets/crypto/ETC.png')} resizeMode="contain" style={{ width: '40%', height: '100%', left: 50, bottom: -70, position: 'absolute' }} />
               </View>
           </View>

           <View style={{ flex: 0.85, borderTopLeftRadius: 30, overflow: 'hidden',  }}>

           <ScrollView style={{ flex: 1, backgroundColor: 'white', minHeight: theme.screenHeight,  borderTopLeftRadius: 30, overflow: 'hidden' }} contentContainerStyle={{ height: theme.screenHeight, overflow: 'hidden', borderTopLeftRadius: 30 }}>
           
            <View style={{ paddingHorizontal: 20, justifyContent: 'center', height: 100  }}>
                <Text color="black" fontSize="24px" fontWeight="bold">Set up your PIN</Text>
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">This is used to secure your assets </Text>
            </View>

            <View style={{ paddingHorizontal: 20, marginTop: 40, }}>

                <Text style={{ fontFamily: theme.fontFamily['Inter-Regular'], fontSize: 20 }}>Code</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>

                    <TextInput ref={refOne as any} keyboardType="number-pad" value={v1}  onChangeText={(e) => checker(1, e)} style={{ width: 69, height: 55, backgroundColor: theme.textInputBgColor, borderRadius: 10, fontFamily: theme.fontFamily['Inter-Bold'], fontSize: 20, color: 'black', paddingLeft: 30  }} /> 

                    <TextInput ref={refTwo as any} keyboardType="number-pad" value={v2}  onChangeText={(e) => checker(2, e)} style={{ width: 69, height: 55, backgroundColor: theme.textInputBgColor, borderRadius: 10, fontFamily: theme.fontFamily['Inter-Bold'], fontSize: 20, color: 'black', paddingLeft: 30  }} /> 

                    <TextInput ref={refThree as any} keyboardType="number-pad" value={v3} onChangeText={(e) => checker(3, e)} style={{ width: 69, height: 55, backgroundColor: theme.textInputBgColor, borderRadius: 10, fontFamily: theme.fontFamily['Inter-Bold'], fontSize: 20, color: 'black', paddingLeft: 30  }} /> 

                    <TextInput ref={refFour as any} keyboardType="number-pad" value={v4}  onChangeText={(e) => checker(4, e)} style={{ width: 69, height: 55, backgroundColor: theme.textInputBgColor, borderRadius: 10, fontFamily: theme.fontFamily['Inter-Bold'], fontSize: 20, color: 'black', paddingLeft: 30  }} />    
                </View>

                <Pressable style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: 60, backgroundColor: theme.primaryBackgroundColor, marginTop: 30, borderRadius: 10 }} onPress={submit}>
                            {!loading && <Text color="white" fontSize="18px">Set PIN</Text>}
                            {loading && <ActivityIndicator color="white" size="small" /> }
                </Pressable>
 

            </View>

        </ScrollView>

           </View>

       </View>
    )
}
