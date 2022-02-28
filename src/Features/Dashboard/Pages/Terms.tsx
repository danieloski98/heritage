import { View, Text, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import React from 'react'
import WebView, {} from 'react-native-webview'
import Navbar from '../components/Navbar'
import { theme } from '../../../utils/theme';

export default function Terms() {
  const [loading, setLoading] = React.useState(true);
  const ref = React.useRef('' as any);
  //console.log(ref);
  React.useMemo(() => {
   const timer = setTimeout(() => {
     setLoading(false);
     clearTimeout(timer);
   }, 5000);
  }, [ref.current])
  return (
    <View style={{ paddingTop: 0, flex: 1 }}>
      <View style={{ width: '100%', height: 120, paddingHorizontal: 20, justifyContent: 'center', backgroundColor: theme.primaryBackgroundColor}}>
        <Text style={{ fontSize: 18, fontFamily: theme.fontFamily['Inter-Medium'], color: 'white', marginTop: 20 }}>Terms & Conditions</Text>
      </View>
      {loading && (
        <View style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={theme.primaryBackgroundColor} />
        </View>
      )}
      {!loading && (
        <WebView ref={(r) => ref.current = r} 
          // originWhitelist={['*']}
          source={{ uri: 'https://musing-bhabha-696ea3.netlify.app/termandcondition'}}
          // onLoad={() => setLoading(true)}
          // onLoadStart={() => setLoading(false)}
        />
      )}

    </View>
  )
}