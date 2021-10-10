import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { theme } from '../../../utils/theme'

export default function UploadFiles() {
    return (
        <View style={{ flex: 1 }}>
           <View style={{ width: '100%', borderRadius: 10, borderWidth: 2, borderStyle: 'dashed', borderColor: 'grey', height: 250, marginTop: 30 }}>
               <Pressable onPress={() => alert('File picked')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="cloud-upload" color={theme.color} size={60} />
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 5 }}>Tap to upload a file here</Text>
                <Text style={{ fontSize: 16, color: 'grey', marginTop: 5 }}>Supports JPG, PNG. PDF</Text>
               </Pressable>
           </View>
        </View>
    )
}
