import React from 'react'
import { View, Modal, Pressable, Platform, ScrollView } from 'react-native'
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

export interface IMageType {
    cancelled: boolean;
    height: number;
    type: string;
    uri: string;
    width: number;
    name: string;
}

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

export default function SellModal({ visible, close, coinType}: IProps) {
    
    const [value, setValue] = React.useState(coinType);
    const [title, setTitle] = React.useState(`Sell ${swicthCoin(value)}`);
    const [amount, setAmount] = React.useState('0');
    const [step, setStep] = React.useState(1);
    const [images, setImages] = React.useState([] as Array<IMageType>);
    const [NGN, setNGN] = React.useState(amount);
    const [USD, setUSD] = React.useState(500)
    const navigation = useNavigation<any>();

    React.useEffect(() => {
        setTitle(`Sell ${swicthCoin(value)}`)
    }, [value]);

    React.useEffect(() => {
        setValue(coinType);
    }, [coinType])

    const switchStep = () => {
        switch(step) {
            case 1 :{
                return <SetAmount value={value} setValue={setValue} amount={amount} setAmount={setAmount} nextStep={changeStep} />
            }
            case 2: {
                return <QRcode nextStep={changeStep} />
            }
            case 3: {
                return <UploadFiles nextStep={changeStep} image={images} setImage={setImages} />
            }
            case 4: {
                return <Summary nextStep={changeStep} images={images} setImage={setImages} />
            }
            case 5: {
                return <Completed />
            }
        }
    }

    const changeStep = (stepp) => {
        if (step < 1 || step > 5) {
            alert('Invalid step');
            return;
        }
        setStep(stepp);
    }

    const goBack = () => {
        setStep(prev => prev-1);
    }

    const onclose = () => {
        close();
        setImages([]);
        setAmount('0');
        setValue(1);
        setStep(1);
    }

    return (
        <Modal visible={visible} onDismiss={() => close} animationType="slide" transparent style={{ backgroundColor: '#00000083'}} >

        <Container height="100%" width="100%" bgColor="#00000083" alignItems="flex-start">

            <View style={{ width: '100%', height: theme.screenHeight/100*60, backgroundColor: 'white', alignItems: 'center', paddingHorizontal: 20 , paddingBottom: 20, borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>

               <ScrollView horizontal={false} style={{ width: '100%' }} showsVerticalScrollIndicator={false}>

                <View style={{ flex: 1, width: '100%', alignContent: 'flex-start' }}>

                    <Container width="100%" height="30px" marginTop="20px" bgColor="white" flexDirection="row" justifyContent="space-between" alignItems="center">
                            <Pressable onPress={goBack}>
                                {step > 1 || step === 5 && <Feather name="chevron-left" size={30} color={theme.color} /> }
                            </Pressable>
                            { step < 5 && <Text fontSize="16px" fontWeight="bold">{title}</Text> }
                            <Pressable onPress={onclose}>
                                <Feather name="x-circle" size={30} color="grey" />
                            </Pressable>
                        </Container>

                    <View style={{ width: '100%', height: '100%' }}>
                      {switchStep()}
                    </View>

                </View>

               </ScrollView>

            </View>

        </Container>
        
    </Modal>
    )
}
