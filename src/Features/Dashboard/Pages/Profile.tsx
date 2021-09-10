import React from 'react'
import { View, ImageBackground, Platform, Pressable, Image, LayoutAnimation, UIManager,  RefreshControl, } from 'react-native'
import Navbar from '../components/Navbar'
import { ScrollView } from 'react-native-gesture-handler'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { Feather } from '@expo/vector-icons'
import { theme } from '../../../utils/theme'
import PersonalInfoForm from '../components/PersonalInfoForm'

const os = Platform.OS

if (os === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Profile() {
    const [index, setIndex] = React.useState(1);
    const [refreshing, setRefreshing] = React.useState(false)

    const changeindex = (num: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setIndex(num);
    }


    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
      }, []);

    return (
        <View style={{ flex: 1 }}>
            <Navbar />
            <View style={{ flex: 1 }}>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.primaryBackgroundColor]} tintColor={theme.primaryBackgroundColor} />}>


                    {/* banner */}

                    <ImageBackground source={{ uri: 'https://cdn.pixabay.com/photo/2018/01/18/07/31/bitcoin-3089728__480.jpg'}} style={{ width: '100%', height: 200 }} blurRadius={os === 'android' ? 2:6}>
                        <Container width="100%" height="100%" bgColor="#070707A1" paddingLeft="20px" paddingRight="20px" flexDirection="row">

                            <Container width="30%" height="100%" bgColor="transparent" justifyContent="center" alignItems="flex-start" >
                                <Container width="80px" height="80px" borderRadius="50px" bgColor="lightgrey" justifyContent="flex-start" alignItems="flex-start">
                                    <Image source={require('../../../../assets/images/avatar.png')} resizeMode="contain"  style={{ width: '100%', height: '100%'}} />
                                </Container>
                            </Container>

                            <Container width="70%" height="100%" justifyContent="center" alignItems="flex-start" bgColor="transparent">
                                <Text color="white" fontSize="23px" fontWeight="bold">Kelechi Onye-Highway</Text>
                                <Text color="white" fontSize="18px" fontWeight="300" marginTop="5px">kessi@heritage.xchange</Text>
                                <Text color="white" fontSize="18px" fontWeight="300" marginTop="15px">Referral Code</Text>
                                <Container width="100%" height="30px" flexDirection="row" justifyContent="flex-start" bgColor="transparent">
                                    <Text color="white" fontSize="18px" fontWeight="bold">223399404</Text>
                                    <Feather name="copy" size={25} color="white" style={{ marginLeft: 20 }} />
                                    <Text color="white" fontSize="18px" fontWeight="bold">Copy</Text>
                                </Container>
                            </Container>

                        </Container>
                    </ImageBackground>
                    
                    {/* tab */}
                    
                    <View style={{ width: '100%', height: 70, backgroundColor: 'whitesmoke', borderBottomWidth: 2, borderBottomColor: 'lightgrey', flexDirection: 'row', paddingHorizontal: 20}}>

                        <Pressable onPress={() => changeindex(1)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 4, borderBottomColor: index === 1? theme.primaryBackgroundColor:'lightgrey' }}>
                            <Text color="black" fontSize="16px">Personal Information</Text>
                        </Pressable>

                        <Pressable onPress={() => changeindex(2)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 4, borderBottomColor: index === 2? theme.primaryBackgroundColor:'lightgrey'}}>
                            <Text color="black" fontSize="16px">Wallet & Bank</Text>
                        </Pressable>

                    </View>

                    {/* forms */}

                    {
                        index === 1 && <PersonalInfoForm />
                    }
                    
                </ScrollView>
            </View>
        </View>
    )
}
