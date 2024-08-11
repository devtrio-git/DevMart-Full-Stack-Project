import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './features/user-slice'
import cartReducer from './features/cart-slice'

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
})

export default rootReducer