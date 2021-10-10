import React from 'react'
import { View, Modal, Pressable, Platform } from 'react-native'
import Container from '../Container'
import { Feather } from '@expo/vector-icons'
import Text from '../Text'
import Button from '../Button'
import { useNavigation } from '@react-navigation/native'
import { theme } from '../../utils/theme'
import SetAmount from './Components/SetAmount'
import BankDetails from './Components/BankDetails'
import UploadFiles from './Components/UploadFiles'
import Summary from './Components/Summary'
import Completed from './Components/Completed'
import QRcode from './SellComponents/QRcode'

const os = Platform.OS;

interface IProps {
    visible: boolean;
    close: Function;
    coinType: number;
    // amount?: number;
}

const swicthCoin = (value: number) => {
    switch(value){
        case 1: {
            return 'Bitcoin'
        }
        case 2: {
            return 'Ethereum'
        }
        case 3: {
            return 'USDT'
        }
    }
}

export default function BuyModal({ visible, close}: IProps) {
    
    const [value, setValue] = React.useState(1);
    const [title, setTitle] = React.useState(`Buy ${swicthCoin(value)}`);
    const [amount, setAmount] = React.useState('0');
    const navigation = useNavigation<any>();

    React.useEffect(() => {
        setTitle(`Buy ${swicthCoin(value)}`)
    }, [value]);

    return (
        <Modal visible={visible} onDismiss={() => close} animationType="slide" transparent style={{ backgroundColor: '#00000083'}} >

        <Container height="100%" width="100%" bgColor="#00000083" alignItems="flex-start">

            <View style={{ width: '100%', height: theme.screenHeight/100*60, backgroundColor: 'white', alignItems: 'center', paddingHorizontal: 20 , paddingBottom: 20, borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>

                <Container width="100%" height="30px" marginTop="20px" bgColor="white" flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Pressable>
                        <Feather name="chevron-left" size={30} color={theme.color} />
                    </Pressable>
                    <Text fontSize="16px" fontWeight="bold">{title}</Text>
                    <Pressable onPress={() => close()}>
                        <Feather name="x-circle" size={30} color="grey" />
                    </Pressable>
                </Container>

               <View style={{ width: '100%', height: '100%' }}>
                {/* <SetAmount value={value} setValue={setValue} amount={amount} setAmount={setAmount} /> */}
                {/* <BankDetails /> */}
                {/* <UploadFiles /> */}
                {/* <Summary /> */}
                {/* <Completed /> */}
                <QRcode />
               </View>

            </View>

        </Container>
        
    </Modal>
    )
}
