import {
    SHORTEN_URL_REQUEST, SHORTEN_URL_SUCCESS, SHORTEN_URL_FAILURE,
    REDIRECT_URL_REQUEST, REDIRECT_URL_SUCCESS, REDIRECT_URL_FAILURE

} from "../actions/types";
const initState = {
    urlData: {
        clicks: Number,
        originUrl: '',
        shortUrl: '',
        urlId: '',
        date: '',
    },
    loading: false,
    redirect: false,
}

const urlReducer = (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        case SHORTEN_URL_REQUEST:
            return { ...state, loading: true }
        case SHORTEN_URL_SUCCESS:
            return { ...state, loading: false, urlData: { ...action.payload } }
        case SHORTEN_URL_FAILURE:
            return { ...state, loading: false, error: action.payload.message }
        case REDIRECT_URL_REQUEST:
            return { ...state }
        case REDIRECT_URL_SUCCESS:
            return { ...state, redirect: true }
        case REDIRECT_URL_FAILURE:
            return { ...state, error: action.payload.message }
        default: return state
    }
}

export default urlReducer