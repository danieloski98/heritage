import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, Platform, StatusBar } from 'react-native'
import React from 'react'
import WebView, {} from 'react-native-webview'
import Navbar from '../components/Navbar'
import { theme } from '../../../utils/theme';

const { OS } = Platform;

export default function Terms() {
  const [loading, setLoading] = React.useState(false);
  const ref = React.useRef('' as any);
  //console.log(ref);
  React.useMemo(() => {
   const timer = setTimeout(() => {
    //  setLoading(false);
    //  clearTimeout(timer);
   }, 5000);
  }, [ref.current])
  return (
   <>
    {OS === 'android' && (
       <View style={{ paddingTop: 0, flex: 1 }}>
       <View style={{ width: '100%', height: 120, paddingHorizontal: 20, justifyContent: 'center', backgroundColor: theme.primaryBackgroundColor}}>
         <Text style={{ fontSize: 18, fontFamily: theme.fontFamily['Inter-Medium'], color: 'white', marginTop: 20 }}>Terms & Conditions</Text>
       </View>
       {loading && (
         <View style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
           <ActivityIndicator size="large" color={theme.primaryBackgroundColor} />
         </View>
       )}
         <WebView ref={(r) => ref.current = r} 
           // originWhitelist={['*']}
           source={{ uri: 'https://musing-bhabha-696ea3.netlify.app/termandcondition'}}
           onLoad={() => setLoading(false)}
           onLoadStart={() => setLoading(true)}
         />
     </View>
    )}
    {OS === 'ios' && (
       <View style={{ paddingBottom: 20, flex: 1 }}>
         <StatusBar barStyle="light-content" translucent />
       <View style={{ width: '100%', height: 120, paddingHorizontal: 20, justifyContent: 'center', backgroundColor: theme.primaryBackgroundColor}}>
         <Text style={{ fontSize: 18, fontFamily: theme.fontFamily['Inter-Medium'], color: 'white', marginTop: 20 }}>Terms & Conditions</Text>
       </View>
       {loading && (
         <View style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
           <ActivityIndicator size="large" color={theme.primaryBackgroundColor} />
         </View>
       )}
         <WebView ref={(r) => ref.current = r} 
           // originWhitelist={['*']}
           source={{ uri: 'https://musing-bhabha-696ea3.netlify.app/termandcondition'}}
           onLoad={() => setLoading(false)}
           onLoadStart={() => setLoading(true)}
         />
     </View>
    )}
   </>
  )
}