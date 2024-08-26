import {combineReducers} from 'redux'
import {authReducer} from '../store/reducers/authReducers.js'
import { productReducer } from './reducers/productReducer.js'
import { transactionReducer } from './reducers/transactionReducer.js'
import { customerReducer } from './reducers/customerReducers.js'

export const reducers = combineReducers({
    auth: authReducer,
    transaction: transactionReducer,
    product: productReducer,
    customer: customerReducer
})

