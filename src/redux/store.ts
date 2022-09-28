import { combineReducers, configureStore } from "@reduxjs/toolkit";
import  userSlice  from "./reducers";
import  menuSlice  from "./orderReducer";

const rootReducer = combineReducers({
    user: userSlice,
    menu: menuSlice
});

export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
    reducer: rootReducer,
});

export default store;