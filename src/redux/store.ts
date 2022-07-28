import { combineReducers, configureStore } from "@reduxjs/toolkit";
import  userSlice  from "./reducers";

const rootReducer = combineReducers({
    user: userSlice
});

export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
    reducer: rootReducer,
});

export default store;