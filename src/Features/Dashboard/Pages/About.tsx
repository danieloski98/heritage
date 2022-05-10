import React from 'react'
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import * as Updates from 'expo-updates';
import { theme } from '../../../utils/theme';

export default function About() {
    const [checking, setChecking] = React.useState(false);

    const check = async () => {
        setChecking(true);
        const updatesAvaliable = await Updates.checkForUpdateAsync();
        if (updatesAvaliable.isAvailable) {
            Alert.alert('Update Avaliable', 'There is an update, would you like to update', [
                {text: 'Update', onPress: async() => { await Updates.fetchUpdateAsync(); await Updates.reloadAsync()}},
                {text: 'cancel', onPress: () => {}}
            ] )
            setChecking(false);
        }else {
            Alert.alert('No New update');
            setChecking(false);
        }
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <View style={{ width: '100%', height: 200 }}>
                <Image source={require('../../../../assets/h.png')} resizeMode="contain" style={{ width: '100%', height: '100%' }} />
            </View>
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Version 1.0.0</Text>
            <TouchableOpacity onPress={check} style={{ marginTop: 20}}>
                {!checking && <Text>Check for update</Text>}
                {checking && <ActivityIndicator color={theme.primaryBackgroundColor} size="large" />}
            </TouchableOpacity>
        </View>
    )
}
