import { createSlice } from '@reduxjs/toolkit'

export const loggedInSlice = createSlice({
    name: 'loggedIn',
    initialState: {
        loggedin: false,
    },
    reducers: {
        login: (state) => {
            state.loggedin = true;
        },
        logout: (state) => {
            state.loggedin = false;
        }
    }
})

export const { login, logout} = loggedInSlice.actions
export default loggedInSlice.reducer;