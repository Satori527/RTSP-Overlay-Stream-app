import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './authSlice';


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const reducer = combineReducers({
    auth: persistReducer(persistConfig, authSlice.reducer),
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer
})

export default store