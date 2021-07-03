import { combineReducers } from 'redux'
import userReducer from './user.reducer'

const rootReducer = combineReducers({
    account: userReducer
})

export default rootReducer