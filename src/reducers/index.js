import { combineReducers } from 'redux'
import urlReducer from './url.reducer'
import userReducer from './user.reducer'

const rootReducer = combineReducers({
    account: userReducer,
    url: urlReducer
})

export default rootReducer