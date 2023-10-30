import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from 'redux-saga'
import rootSaga from './watchers/watchers'
import rootReducer from './reducers/reducers'
///persist
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import categoryReducer from "../redux/reducers/categoryReducer";
import authenticationReducer from "../redux/reducers/authenticationReducer";
import cartReducer from "../redux/reducers/cartReducer";
import orderReducer from "../redux/reducers/orderReducer";

const persistConfig = {
    key: 'authAndOrder',
    storage: AsyncStorage,
    whitelist: ['authenticationReducer', 'orderReducer']
}

const categoryPersistConfig = {
    key: 'category',
    storage: AsyncStorage,
    whitelist: ['idCategory', 'category']
};

const cartPersistConfig = {
    key: 'cart',
    storage: AsyncStorage,
    blacklist: ['myLocation', 'discountAndPaymentTypeList']
}

const rootReducerStore = combineReducers({
    categoryReducer: persistReducer(categoryPersistConfig, categoryReducer),
    cartReducer: persistReducer(cartPersistConfig, cartReducer),
    authenticationReducer,
    orderReducer,
});

const saga = createSagaMiddleware()
const middleWares = [saga]
const persistedReducer = persistReducer(persistConfig, rootReducerStore);

const store = legacy_createStore(persistedReducer, applyMiddleware(...middleWares))
const persistor = persistStore(store)
saga.run(rootSaga)

export default {store, persistor}