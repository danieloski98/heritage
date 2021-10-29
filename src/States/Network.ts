import { createSlice } from '@reduxjs/toolkit'

const initialState: {connected: boolean | null} = {
    connected: null,
};

const action = (state: {connected: boolean| null}, action: {payload: boolean}) => {
    state.connected = action.payload;
}

export const networkSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        toValue: action,
    }
})

export const { toValue } = networkSlice.actions
export default networkSlice.reducer;