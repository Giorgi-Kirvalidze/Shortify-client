import axios from '../helpers/axios'
import {
    SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
} from './types'

export const signup = user => async dispatch => {
    console.log(user)
    dispatch({ type: SIGNUP_REQUEST })
    try {
        const res = await axios.post('users/signup', user)
        console.log(res)
        if (res.status === 201) {
            const { message } = res.data
            dispatch({ type: SIGNUP_SUCCESS, payload: { message } })
        }
        if (res.status === 400) {
            dispatch({ type: SIGNUP_FAILURE, payload: { message: res.data.message } })
        }
    } catch (e) {
        dispatch({ type: SIGNUP_FAILURE, payload: { e: e.response.data.message } })
    }
}

export const signin = user => async dispatch => {
    console.log({ ...user })
    dispatch({ type: LOGIN_REQUEST })
    try {
        const res = await axios.post('/users/signin', { ...user })
        console.log(res)
        dispatch({ type: LOGIN_SUCCESS, payload: res.data })
        if (res.status === 400) {
            dispatch({ type: LOGIN_FAILURE, payload: { message: res.data.message } })
        }
    } catch (e) {
        dispatch({ type: LOGIN_FAILURE, payload: { e: e.response.data.message } })
    }
}