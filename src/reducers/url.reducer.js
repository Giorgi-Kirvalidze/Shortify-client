import {
    SHORTEN_URL_REQUEST, SHORTEN_URL_SUCCESS, SHORTEN_URL_FAILURE,

} from "../actions/types";
const initState = {
    urlData: {
        clicks: 0,
        originUrl: '',
        shortUrl: '',
        urlId: '',
        date: '',
        uniqueClick: 0,
        clickedByUsers: []
    },
    loading: false,
}

const urlReducer = (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        case SHORTEN_URL_REQUEST:
            return { ...state, loading: true }
        case SHORTEN_URL_SUCCESS:
            return { ...state, loading: false, urlData: action.payload }
        case SHORTEN_URL_FAILURE:
            return { ...state, loading: false, error: action.payload.message }

        default: return state
    }
}

export default urlReducer