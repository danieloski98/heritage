import React from 'react'
import { ActivityIndicator, Alert, Pressable, TextInput, View,  } from 'react-native'
import Container from '../../../globalcomponents/Container'
import Text from '../../../globalcomponents/Text'
import { theme } from '../../../utils/theme'
import { Feather, Ionicons } from '@expo/vector-icons'
import Button from '../../../globalcomponents/Button'
import * as yup from 'yup';
import { useFormik } from 'formik'
import { queryClient } from '../../../../App'

// redux
import { RootState } from '../../../store'
import { useSelector } from 'react-redux'
import { updateUser } from '../../../States/UserDetails'
import url from '../../../utils/url'
import { IReturnType } from '../../../Types/ReturnType'

const validationSchema = yup.object({
    bitcoin_wallet: yup.string().required(),
    ethereum_wallet: yup.string().required(),
    usdt_wallet: yup.string().required(),
    bank_name: yup.string().required(),
    account_name: yup.string().required(),
    account_number: yup.string().required(),
})

export default function WalletsBanks() {
    const [loading, setLoading] = React.useState(false);

    // redux
    const user = useSelector((state: RootState) => state.userdetail.user);
    const token = useSelector((state: RootState) => state.userdetail.token);

    console.log(user);

    // formik
    const formik = useFormik({
        initialValues: {bitcoin_wallet: user.bitcoin_wallet, ethereum_wallet: user.ethereum_wallet, usdt_wallet: user.usdt_wallet, bank_name: user.bank_name, account_name: user.account_name, account_number: user.account_number },
        onSubmit: () => {},
        validationSchema,
    })

    const submit = async () => {
        if (!formik.dirty) {
          Alert.alert('Message', 'Make a change first', [
            { text: 'ok', style: "cancel", onPress: () => {}}
          ]);
          return;
        }
    
        if (!formik.isValid) {
          Alert.alert('Message', 'Please Fill in the form properly to continue', [
            { text: 'ok', style: "cancel", onPress: () => {}}
          ]);
          return;
        }
    
        setLoading(true);
        console.log(user);
    
        // make request
        const request = await fetch(`${url}user/edit/details/${user._id}`, {
          method: 'put',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify(formik.values)
        });
    
        const json = await request.json() as IReturnType;
        setLoading(false);
        if (json.statusCode !== 200) {
          Alert.alert('Message', json.errorMessage, [
            {
              text: 'ok', style: 'cancel', onPress: () => {}
            }
          ]);
          return;
        }else {
            queryClient.invalidateQueries();
        //   dispatch(updateUser(json.data.user));
        //   dispatch(updateToken(json.data.token));
    
          // console.log(user);
    
          Alert.alert('Message', json.successMessage, [
            {
              text: 'ok', style: 'cancel', onPress: () => {}
            }
          ]);
          formik.resetForm();
          return;
        }
        
      }

    return (
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 30, paddingBottom: 200, backgroundColor: 'white' }}>
            <Text fontSize="20px" color="black" fontWeight="bold">My Wallet Addresses</Text>

            <Container width="100%" height="80px" justifyContent="center" alignItems="flex-start" marginTop="20px" bgColor="white">
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="0px">BTC Address</Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Ionicons name="wallet" size={25} color={theme.color} />
                    <TextInput style={{ flex: 1, paddingHorizontal: 10 }} value={formik.values.bitcoin_wallet} onChangeText={formik.handleChange('bitcoin_wallet')} onFocus={() => formik.setFieldTouched('bitcoin_wallet', true, true)} />
                </Container>
            </Container>

            <Container width="100%" height="80px" justifyContent="center" alignItems="flex-start" marginTop="20px" bgColor="white">
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="0px">ETH Address</Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Ionicons name="wallet" size={25} color={theme.color} />
                    <TextInput style={{ flex: 1, paddingHorizontal: 10 }} value={formik.values.ethereum_wallet} onChangeText={formik.handleChange('ethereum_wallet')} onFocus={() => formik.setFieldTouched('ethereum_wallet', true, true)} />
                </Container>
            </Container>

            <Container width="100%" height="80px" justifyContent="center" alignItems="flex-start" marginTop="20px" bgColor="white">
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="0px">USDT Address</Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Ionicons name="wallet" size={25} color={theme.color} />
                    <TextInput style={{ flex: 1, paddingHorizontal: 10 }} value={formik.values.usdt_wallet} onChangeText={formik.handleChange('usdt_wallet')} onFocus={() => formik.setFieldTouched('usdt_wallet', true, true)} />
                </Container>
            </Container>

            <Text fontSize="20px" color="black" fontWeight="bold" marginTop="40px">My Bank Details</Text>

            <Container width="100%" height="80px" justifyContent="center" alignItems="flex-start" marginTop="20px" bgColor="white">
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="0px">Account Name</Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Ionicons name="person" size={25} color={theme.color} />
                    <TextInput style={{ flex: 1, paddingHorizontal: 10 }} value={formik.values.account_name} onChangeText={formik.handleChange('account_name')} onFocus={() => formik.setFieldTouched('account_name', true, true)} />
                </Container>
            </Container>

            <Container width="100%" height="80px" justifyContent="center" alignItems="flex-start" marginTop="20px" bgColor="white">
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="0px">Bank Name</Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Ionicons name="card" size={25} color={theme.color} />
                    <TextInput style={{ flex: 1, paddingHorizontal: 10 }} value={formik.values.bank_name} onChangeText={formik.handleChange('bank_name')} onFocus={() => formik.setFieldTouched('bank_name', true, true)} />
                </Container>
            </Container>

            <Container width="100%" height="80px" justifyContent="center" alignItems="flex-start" marginTop="20px" bgColor="white">
                <Text color="gray" fontSize="16px" fontWeight="500" marginTop="0px">Account Number</Text>
                <Container flexDirection="row" width="100%" borderRadius="5px" justifyContent="flex-start" alignItems="center" bgColor={theme.textInputBgColor} height="55px" marginTop="10px" paddingLeft="10px" paddingRight="10px">
                    <Ionicons name="card" size={25} color={theme.color} />
                    <TextInput style={{ flex: 1, paddingHorizontal: 10 }} keyboardType="number-pad" value={formik.values.account_number} onChangeText={formik.handleChange('account_number')} onFocus={() => formik.setFieldTouched('account_number', true, true)} />
                </Container>
            </Container>

            <Container width="50%" height="55px" marginTop="20px">
                <Pressable style={{ width: '100%'}} android_ripple={{ radius: 10, color: 'white', borderless: false }} onPress={submit} >
                    <Button>
                        {!loading && <Text color="white">update</Text>}
                        {loading && <ActivityIndicator color="white" size="small" /> }
                    </Button>
                </Pressable>
            </Container>
        </View>
    )
}
