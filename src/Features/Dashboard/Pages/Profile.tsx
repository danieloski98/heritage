import React from 'react'
import { View, ImageBackground, Platform, Pressable, Image, LayoutAnimation, UIManager,  RefreshControl, ScrollView } from 'react-native'
import Navbar from '../components/Navbar'
// import { ScrollView } from 'react-native-gesture-handler'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { Feather } from '@expo/vector-icons'
import { theme } from '../../../utils/theme'
import PersonalInfoForm from '../components/PersonalInfoForm'
import { useNavigation } from '@react-navigation/native'
import WalletsBanks from '../components/WalletsBanks'
import { useQuery } from 'react-query'
import { IReturnType } from '../../../Types/ReturnType'
import url from '../../../utils/url'

// redux
import { RootState } from '../../../store'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../../../States/UserDetails'


//query Function
const getDetails = async(id: string, token: string) => {
    const request = await fetch(`${url}user/${id}`, {
        headers: {
            authorization: `Bearere ${token}`
        }
    })

    const json = await request.json() as IReturnType;
    return json;
}

const os = Platform.OS

if (os === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Profile() {
    const [index, setIndex] = React.useState(1);
    const [refreshing, setRefreshing] = React.useState(false)
    const navigation = useNavigation()

    // redux
    const user = useSelector((state: RootState) => state.userdetail.user);
    const token = useSelector((state: RootState) => state.userdetail.token);
    const dispatch = useDispatch();

    const { refetch } = useQuery(['getDetails', {id: user._id, token: token }], () => getDetails(user._id, token), {
        onSuccess: (data) => {
            dispatch(updateUser(data.data.user));
            setRefreshing(false);
        },
        onError: (error) => {
            alert('An error occured');
        },
    });

    const changeindex = (num: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setIndex(num);
    }


    const onRefresh = React.useCallback(async() => {
        setRefreshing(true);
        await refetch()
      }, []);

    return (
        <View style={{ flex: 1 }}>
            <Navbar />
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }} >


                    {/* banner */}

                    <ImageBackground source={{ uri: 'https://cdn.pixabay.com/photo/2018/01/18/07/31/bitcoin-3089728__480.jpg'}} style={{ width: '100%', height: 200 }} blurRadius={os === 'android' ? 2:6}>
                        <Container width="100%" height="100%" bgColor="#070707A1" paddingLeft="20px" paddingRight="20px" flexDirection="row" alignItems="flex-start">
                            {
                                os === 'ios' && (
                                    <Container width="10%" height="30px" alignItems="flex-end" bgColor="transparent" justifyContent="flex-start" marginTop="10px">
                                        <Feather name="arrow-left" size={30} color="white" onPress={() => navigation.goBack()} />
                                    </Container>
                                )
                            }

                            <Container width="20%" height="100%" bgColor="transparent" justifyContent="center" alignItems="flex-start" marginRight="20px">
                                <Container width="70px" height="70px" borderRadius="50px" bgColor="lightgrey" justifyContent="flex-start" alignItems="flex-start">
                                    <Image source={require('../../../../assets/crypto/BNB.png')} resizeMode="contain"  style={{ width: '100%', height: '100%'}} />
                                </Container>
                            </Container>

                            <Container width="70%" height="100%" justifyContent="center" alignItems="flex-start" bgColor="transparent">
                                <Text color="white" fontSize="20px" fontWeight="bold">{user.first_name} {user.last_name}</Text>
                                <Text color="white" fontSize="18px" fontWeight="300" marginTop="5px">{user.email}</Text>
                                <Text color="white" fontSize="18px" fontWeight="300" marginTop="15px">Referral Code</Text>
                                <Container width="100%" height="30px" flexDirection="row" justifyContent="flex-start" bgColor="transparent">
                                    <Text color="white" fontSize="18px" fontWeight="bold">{user._id.slice(0, 10)}</Text>
                                    <Feather name="copy" size={25} color="white" style={{ marginLeft: 20 }} />
                                    <Text color="white" fontSize="18px" fontWeight="bold">Copy</Text>
                                </Container>
                            </Container>

                        </Container>
                    </ImageBackground>
                    
                    <ScrollView horizontal={false} style={{ flex: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.primaryBackgroundColor]} tintColor={theme.primaryBackgroundColor} progressViewOffset={50} />} >

                        {/* tab */}
                    
                        <View style={{ width: '100%', height: 70, backgroundColor: theme.light, flexDirection: 'row', paddingHorizontal: 20}}>

                        <Pressable onPress={() => changeindex(1)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomWidth: index === 1 ? 4:0, borderBottomColor: index === 1? theme.primaryBackgroundColor:'lightgrey' }}>
                            <Text color="black" fontSize="16px">Personal Information</Text>
                        </Pressable>

                        {/* <Pressable onPress={() => changeindex(2)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomWidth: index === 2 ? 4:0, borderBottomColor: index === 2? theme.primaryBackgroundColor:'lightgrey'}}>
                            <Text color="black" fontSize="16px">Wallet & Bank</Text>
                        </Pressable> */}

                        </View>

                        {/* forms */}

                        {
                        index === 1 && <PersonalInfoForm />
                        }

                        { index === 2 && <WalletsBanks /> }

                    </ScrollView>
                    
                </View>
            </View>
        </View>
    )
}
