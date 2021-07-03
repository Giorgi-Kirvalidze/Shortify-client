import { SIGNUP_FAILURE, SIGNUP_SUCCESS, SIGNUP_REQUEST, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions/types";
const initState = {
    user: {
        jwtToken: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    },
    message: '',
    authenticate: false,
    authetnticating: false,
}

const userReducer = (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        case SIGNUP_REQUEST:
            return { ...state, loading: true }
        case SIGNUP_SUCCESS:
            return { ...state, loading: false, authenticate: true, message: action.payload.message }
        case SIGNUP_FAILURE:
            return { ...state, loading: false, error: action.payload.message }
        case LOGIN_REQUEST:
            return { ...state, loading: true }
        case LOGIN_SUCCESS:
            return { ...state, loading: false, authenticate: true, verified: true, authenticated: true, user: { ...action.payload } }
        case LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload.message }
        default: return state
    }
}

export default userReducer