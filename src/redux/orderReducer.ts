import { createSlice } from '@reduxjs/toolkit'


export type UserOrder = {
    totalPrice: number,
    amountOfProduct: number
}

const initialState : UserOrder = {
    totalPrice: 0,
    amountOfProduct: 0
};


const userSlice = createSlice({
    name: 'orderSlice',
    initialState: initialState,
    reducers: {
        add: state => {
            state.amountOfProduct += 1 ;
        },
        minus: state => {
            if (state.amountOfProduct > 0) {
                state.amountOfProduct -= 1 ;
            }
        }
    }
});

export const useActions = userSlice.actions
export default userSlice.reducer;