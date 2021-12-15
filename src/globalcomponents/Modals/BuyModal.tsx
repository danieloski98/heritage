import React from 'react'
import { View, Modal, Pressable, Platform, ScrollView, Alert } from 'react-native'
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
import url from '../../utils/url'


// redux things
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'

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
    getCoin: Function;
    action: number
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

export default function BuyModal({ visible, close, coinType, getCoin, action}: IProps) {
    
    const [value, setValue] = React.useState(coinType);
    const [title, setTitle] = React.useState(`Buy ${swicthCoin(value)}`);
    const [amount, setAmount] = React.useState(0);
    const [step, setStep] = React.useState(1);
    const [images, setImages] = React.useState([] as Array<IMageType>);
    const [NGN, setNGN] = React.useState(amount);
    const [USD, setUSD] = React.useState(500)
    const navigation = useNavigation<any>();

    // redux state
    const user = useSelector((state: RootState) => state.userdetail.user);
    const token = useSelector((state: RootState) => state.userdetail.token);
    const dispatch = useDispatch();

    React.useEffect(() => {
        setTitle(`Buy ${swicthCoin(value)}`)
    }, [value]);

    React.useEffect(() => {
        setValue(coinType);
    }, [coinType])

    const switchStep = () => {
        switch(step) {
            case 1 :{
                return <SetAmount opener={1} value={value} setValue={setValue} amount={amount} setAmount={setAmount} nextStep={changeStep} getCoin={getCoin} />
            }
            case 2: {
                return <BankDetails value={value} amount={amount} nextStep={changeStep} getCoin={getCoin} />
            }
            case 3: {
                return <UploadFiles nextStep={changeStep} image={images} setImage={setImages} />
            }
            case 4: {
                return <Summary nextStep={changeStep} images={images} setImage={setImages} action={action} coinType={coinType} onpress={submit} />
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
        setAmount(0);
        setValue(1);
        setStep(1);
    }

    const switchID = (): any => {
        if (value === 1) {
            return 'bitcoin';
        }else if (value === 2) {
            return 'ethereum';
        }else {
            return 'tether';
        }
    }

    const submit = async () => {
        try {
            const obj = {
                type: 1,
                coin_amount: amount,
                amount: amount <= 0 ? 0 : amount < 1 ? Math.fround((Math.round(getCoin(switchID()).current_price) * amount) * 550) : getCoin(switchID()).current_price * amount * 550,
                coin_type: coinType,
            }

            const request = await fetch(`${url}transaction/create/${user._id}`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(obj),
            });

            const json1 = await request.json();

            if (json1.statusCode !== 200) {
                Alert.alert('Message', json1.errorMessage);
                return;
            } else {
                // upload images
                const formData = new FormData();
                images.map((item: any) => {
                    formData.append(item.name, item);
                });

                const request = await fetch(`${url}transaction/uploadfiles/${json1.data._id}`, {
                    method: 'post',
                    headers: {
                        'content-type': 'multipart/form-data',
                        authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });

                const json = await request.json();
                if (json.statusCode !== 200) {
                    Alert.alert('Message', json.errorMessage);
                    return;
                } else {
                    setStep(5);
                    
                }
            }
        } catch (error) {
            
        }
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
