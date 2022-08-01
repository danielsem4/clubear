import { createSlice } from '@reduxjs/toolkit'

export type UserState = {
    user: string,
    logedIn: boolean,
    load: boolean
};

const initialState : UserState = {
    user: '',
    logedIn: false,
    load: true  // the load value is opposite to the screen state!!
};

const userSlice = createSlice({
    name: 'Israel',
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
        }
    }
});

export const useActions = userSlice.actions
export default userSlice.reducer;