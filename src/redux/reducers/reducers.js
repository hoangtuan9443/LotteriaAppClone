import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import authenticationReducer from "./authenticationReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";

export default reducer = combineReducers({
    categoryReducer,
    authenticationReducer,
    cartReducer,
    orderReducer,
})