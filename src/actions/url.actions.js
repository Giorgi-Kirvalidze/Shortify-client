import axios from '../helpers/axios'
import {
    SHORTEN_URL_REQUEST, SHORTEN_URL_SUCCESS, SHORTEN_URL_FAILURE,
    REDIRECT_URL_REQUEST, REDIRECT_URL_SUCCESS, REDIRECT_URL_FAILURE,

} from './types'

export const shortenUrl = url => async dispatch => {
    console.log(url)
    dispatch({ type: SHORTEN_URL_REQUEST })
    try {
        const res = await axios.post('/url/shorten', { 'originUrl': url })
        console.log(res)
        if (res.status === 200) {
            dispatch({ type: SHORTEN_URL_SUCCESS, payload: res.data })
        }
        if (res.status === 400) {
            dispatch({ type: SHORTEN_URL_FAILURE, payload: { message: res.data.message } })
        }
    } catch (e) {
        dispatch({ type: SHORTEN_URL_FAILURE, payload: { e: e.response.data.message } })
    }
}

export const redirectUrl = url => async dispatch => {
    console.log(url)
    dispatch({ type: REDIRECT_URL_REQUEST })
    try {
        const res = await axios.get(`/url/${url}`)
        console.log(res)
        if (res.status === 200) {
            dispatch({ type: REDIRECT_URL_SUCCESS })
        }
        if (res.status === 400) {
            dispatch({ type: REDIRECT_URL_FAILURE, payload: { message: res.data.message } })
        }
    } catch (e) {
        dispatch({ type: REDIRECT_URL_FAILURE, payload: { e: e.response.data.message } })
    }
}