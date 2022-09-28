import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../components';


export type UserOrder = {
    totalPrice: number,
    amountOfProduct: number,
    gotProducts: boolean,
    products: Array<{
        name: string,
        quantity: number,
        totalPrice: number
      }>
}

const initialState : UserOrder = {
    totalPrice: 0,
    amountOfProduct: 0,
    gotProducts: false, // check if i got the product from the firebase
    products: [{ 
        name: '',
        quantity: 0,
        totalPrice: 0
    }]
};

const menuSlice = createSlice({
    name: 'orderSlice',
    initialState: initialState,
    reducers: {
        add: ( state, action ) => { // add product to cart
            const existingCartItemIndex = state.products.findIndex((item: {
                name: string,
                quantity: number,
                totalPrice: number
              }) => item.name === action.payload.item.name); 
              
              if (state.products[existingCartItemIndex]) {
                state.products[existingCartItemIndex].quantity++;
                state.totalPrice += action.payload.item.price;
              } else {
                state.products.push({
                    name: action.payload.item.name,
                    quantity: action.payload.quantity + 1,
                    totalPrice: action.payload.item.price * action.payload.quantity
                });
                state.totalPrice += action.payload.item.price;
              }
        },
        minus: ( state, action ) => { // reduce product from the cart 
            const existingCartItemIndex = state.products.findIndex((item: {
                name: string,
                quantity: number,
                totalPrice: number
              }) => item.name === action.payload.item.name);
              if (state.products[existingCartItemIndex]) {
                if (state.products[existingCartItemIndex].quantity > 0) {
                    state.products[existingCartItemIndex].quantity--;
                    state.totalPrice -= action.payload.item.price;
                }
              }
        },
        updateMenuState: state => { // update if the user got the data from the firebase
            state.gotProducts = !state.gotProducts;
        },
        setNewCart: state => { // reset the cart 
            state.products = [{
                name: '',
                quantity: 0,
                totalPrice: 0
            }];
            state.totalPrice = 0;
        }
    }
});

export const useActions = menuSlice.actions
export default menuSlice.reducer;