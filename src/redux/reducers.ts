import { createSlice } from '@reduxjs/toolkit'

export type UserState = {
    user: string,
    logedIn: boolean,
    load: boolean,
    language: boolean,
    admin: boolean
};

const initialState : UserState = {
    user: '',
    logedIn: false,
    language: false, // false == English, true == Hebrew
    admin: false,
    load: true  // the load value is opposite to the screen state!!
};


const userSlice = createSlice({
    name: 'stateSlice',
    initialState: initialState,
    reducers: {
        setLoader: state => {
            state.load = !state.load;
        },
        updateName: (state, action) => {
            state.user = action.payload
        },
        setLogedIn: (state) => {
            state.logedIn = !state.logedIn;
        },
        setLanguage: (state) => {
            state.language = !state.language;
        },
        setAdmin: (state) => {
            state.admin = !state.admin;
        }
    }
});

export const useActions = userSlice.actions
export default userSlice.reducer;