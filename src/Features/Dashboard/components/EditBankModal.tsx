import { View, Modal, TextInput, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import Container from '../../../globalcomponents/Container'
import { Feather, Ionicons } from '@expo/vector-icons'
import { theme } from '../../../utils/theme';
import Text from '../../../globalcomponents/Text'
import { IndexPath, Select, SelectItem} from '@ui-kitten/components'
import url from '../../../utils/url';
import { IReturnType } from '../../../Types/ReturnType';
import {Picker} from '@react-native-picker/picker';
import Button from '../../../globalcomponents/Button';
import { IUser } from '../../../Types/User';

interface IProps {
    formik: any;
    loading: boolean;
    open: boolean;
    setClose: Function;
    submit: Function;
    user: IUser;
}

export default function EditBankModal({formik, loading, open, setClose, submit, user}: IProps) {
    const [banks, setBanks] = React.useState([] as Array<IBank>);
    const [selected, setSelected] = React.useState('');
    const [code, setCode] = React.useState('');
    const [verifying, setVerifying] = React.useState(false);

    React.useEffect(() => {
        (async function() {
            const request = await fetch(`${url}bank/all`);
            const json = await request.json() as IReturnType;
            const data = json.data as Array<IBank>;
            setBanks(data);
            console.log(user.bank_name);

        })()
    }, []);

    React.useEffect(() => {
       if (code !== '') {
        (async function() {
            const request = await fetch(`${url}bank/verifyaccount?bank_code=${code}&account_number=${formik.values.account_number}`);
            const json = await request.json() as IReturnType;
            setVerifying(false);
            if (json.statusCode !== 200) {
                alert(json.errorMessage);
            }else {
                console.log(json.data);
                formik.setFieldValue('account_name', json.data.account_name, true);
                formik.setFieldValue('bank_name', selected, true);
                alert(`${json.successMessage} ${json.data.account_name}`);
            }
        })()
       }
    }, [code]);

    const select = async (value: string) => {
        const bank = banks.filter((item, index) => item.code === value);
        setSelected(bank[0].name);
        setCode(bank[0].code);
        setVerifying(true);
    }

  return (
   <Modal visible={open} animationType='slide' transparent>
       <View style={{ flex: 1, backgroundColor: '#00000083', justifyContent: 'flex-end' }}>
           <View style={{ width: '100%', height: '60%', backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingHorizontal: 20, paddingTop: 20  }}>

        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Feather name="x" size={25} color="black" onPress={() => setClose(false)} />
        </View>

           <Container width="100%" height="80px" justifyContent="center" alignItems="flex-start" marginTop="20px" bgColor="white">
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="0px">Account Number</Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Ionicons name="card" size={25} color={theme.color} />
                    <TextInput 
                    // editable={false}
                    // selectTextOnFocus={false}
                    style={{ flex: 1, paddingHorizontal: 10 }} 
                    keyboardType="number-pad" 
                    value={formik.values.account_number} 
                    onChangeText={formik.handleChange('account_number')} 
                    onFocus={() => formik.setFieldTouched('account_number', true, true)} />
                </Container>
            </Container>
       

            <Container width="100%" height="80px" justifyContent="center" alignItems="flex-start" marginTop="20px" bgColor="white">
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="0px">Bank Name</Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Ionicons name="card" size={25} color={theme.color} />
                    <Picker
                        style={{ width: '100%', height: 55, backgroundColor: 'transparent' }}
                        selectedValue={code}
                        onValueChange={(value, index) => select(value)}
                    >
                        {banks.map((item, index) => (
                            <Picker.Item key={`${index.toString()}`} label={item.name} value={item.code} />
                        ))}
                    </Picker>

                    {/* <TextInput 
                    editable={false}
                    selectTextOnFocus={false}
                    style={{ flex: 1, paddingHorizontal: 10 }} 
                    value={formik.values.bank_name} 
                    onChangeText={formik.handleChange('bank_name')} 
                    onFocus={() => formik.setFieldTouched('bank_name', true, true)} /> */}
                   
                </Container>
            </Container>


            <Container width="100%" height="80px" justifyContent="center" alignItems="flex-start" marginTop="20px" bgColor="white">
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="0px">Account {verifying && <Text fontSize="16px" fontFamily={theme.fontFamily['Inter-SemiBold']} color={theme.primaryBackgroundColor}> (Verifying...)</Text>} </Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Ionicons name="person" size={25} color={theme.color} />
                    <TextInput 
                    editable={false}
                    selectTextOnFocus={false}
                    style={{ flex: 1, paddingHorizontal: 10 }} 
                    value={formik.values.account_name} 
                    onChangeText={formik.handleChange('account_name')} 
                    onFocus={() => formik.setFieldTouched('account_name', true, true)} />
                </Container>
            </Container>


            <Container width="100%" height="55px" marginTop="20px">
                <Pressable style={{ width: '100%'}} android_ripple={{ radius: 10, color: 'white', borderless: false }} onPress={() => submit()}  >
                    <Button>
                        {!loading && <Text color="white">update</Text>}
                        {loading && <ActivityIndicator color="white" size="small" /> }
                    </Button>
                </Pressable>
            </Container>

           </View>
       </View>
   </Modal>
  )
}