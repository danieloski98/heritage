import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../Types/User';

const initialState:  {user:IUser, token: string} =  {
    user: {
        email: '',
    password: '',
    first_name: '',
    last_name: '',
    bitcoin_wallet: '',
    ethereum_wallet: '',
    usdt_wallet: '',
    verified: false,
    _id: ',',
    phone: '',
    },
    token: '',
   
};

export const UserDetailSlice = createSlice({
    name: 'Login',
    initialState,
    reducers: {
        login: (state, action) => {
            state = {...state, ...action.payload}
        },
        updateUser: (state: {user:IUser, token: string},  action:{ payload: IUser}) => {
            state.user = { ...state.user, ...action.payload};
            console.log(state.user);
        },
        updateToken: (state: {user:IUser, token: string},  action:{ payload: string}) => {
            console.log(action.payload);
            state.token = action.payload;
            console.log(state.token);
        }
    }
})

export const { login, updateUser, updateToken } = UserDetailSlice.actions;
export default UserDetailSlice.reducer;