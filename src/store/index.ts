import { configureStore } from '@reduxjs/toolkit';
import UserDetailReducer from '../States/UserDetails';
import CounterReducer from '../States/Counter'
import NetworkReducer from '../States/Network'
import PayPointReducer from '../States/Paypoint'
import LoggedInReducer from '../States/LoggedIn'

const store = configureStore({
    reducer: {
        userdetail: UserDetailReducer,
        counter: CounterReducer,
        network: NetworkReducer,
        paypoint: PayPointReducer,
        loggedin: LoggedInReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;