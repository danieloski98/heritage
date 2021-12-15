import React from 'react'
import { View, Modal, Pressable, Platform } from 'react-native'
import Container from '../Container'
import { Feather } from '@expo/vector-icons'
import Text from '../Text'
import Button from '../Button'
import { useNavigation } from '@react-navigation/native'

const os = Platform.OS;

interface IProps {
    visible: boolean;
    close: Function;
}

export default function AddDetails({ visible, close}: IProps) {

    const navigation = useNavigation<any>();

    return (
        <Modal visible={visible} onDismiss={() => close} animationType="slide" transparent style={{ backgroundColor: '#00000083'}} >

            <Container height="100%" width="100%" bgColor="#00000083" alignItems="flex-start">

                <View style={{ width: '100%', height: 300, backgroundColor: 'white', alignItems: 'center', paddingHorizontal: 20 , paddingBottom: 20, borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>

                    <Container width="100%" height="30px" marginTop="20px" bgColor="white">
                        <Pressable onPress={() => close()}>
                            <Feather name="x-circle" size={30} color="grey" />
                        </Pressable>
                    </Container>

                    <Text marginTop="20px" fontSize="18px" color="black" fontWeight={os === 'ios' ? '600':'bold'}>Please Link Your Bank & Wallet</Text>
                    <Text textAlign="center" marginTop="20px" fontSize="16px" color="grey">In order to perform this action you need to link your  Bank & Wallets</Text>
                    
                    <Container width="100%" height="55px" alignItems="flex-start" marginTop="30px">
                        <Button>
                            <Pressable onPress={() => {close(); navigation.navigate('settings')} }>
                                <Text color="white">Link Bank & Wallet</Text>
                            </Pressable>
                        </Button>
                    </Container>

                </View>

            </Container>
            
        </Modal>
    )
}
