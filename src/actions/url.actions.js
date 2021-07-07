import axios from '../helpers/axios'
import {
    SHORTEN_URL_REQUEST, SHORTEN_URL_SUCCESS, SHORTEN_URL_FAILURE,
} from './types'

export const shortenUrl = (url, id) => async dispatch => {
    dispatch({ type: SHORTEN_URL_REQUEST })
    try {
        const res = await axios.post('/url/shorten', { 'originUrl': url, 'id': id })
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
