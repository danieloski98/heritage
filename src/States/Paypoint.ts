import { createSlice } from '@reduxjs/toolkit'
import { IPaypoint } from '../Types/Paypoint';

const initialState: {paypoint: IPaypoint} = {
    paypoint: {
        bitcoin_wallet: '',
        etheruem_wallet: '',
        createdAt: '',
        bank: {
            account_name: '',
            account_number: '',
            account_type: 'SAVINGS',
            bank_code: '',
            bank_name: ''
        },
        rate: 0,
        updatedAt: '',
        usdt_wallet: ''
    }
};

const action = (state: {paypoint: IPaypoint}, action: {payload: IPaypoint}) => {
    console.log(action.payload);
    state.paypoint = {...action.payload};
}

export const PaypointSlice = createSlice({
    name: 'paypoint',
    initialState,
    reducers: {
        setPaypoint: action,
    }
})

export const { setPaypoint } = PaypointSlice.actions
export default PaypointSlice.reducer;