import { FETCH_CHAT_BY_PROJECT_SUCCESS, FETCH_CHAT_MESSAGES_FAILURE, FETCH_CHAT_MESSAGES_REQUEST, FETCH_CHAT_MESSAGES_SUCCESS, FETCH_MESSAGES_FAILURE, FETCH_MESSAGES_REQUEST, FETCH_MESSAGES_SUCCESS, SEND_MESSAGES_FAILURE, SEND_MESSAGES_REQUEST, SEND_MESSAGES_SUCCESS } from "./ActionTypes";

const initialState = {
    messages:[],
    loading: false,
    error: null,
    chat: null
};

export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MESSAGES_REQUEST:
        case SEND_MESSAGES_REQUEST:
        case FETCH_CHAT_MESSAGES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_MESSAGES_SUCCESS:
        case FETCH_CHAT_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                messages : action.payload
            };
        
        case SEND_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                messages : [...state.messages, action.payload]
            };

        case FETCH_CHAT_BY_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                chat: action.payload
            };

        case FETCH_MESSAGES_FAILURE:
        case SEND_MESSAGES_FAILURE:
        case FETCH_CHAT_MESSAGES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        default:
            return state;
    }
}