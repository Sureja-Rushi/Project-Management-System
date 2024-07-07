import api from "@/config/api";
import { FETCH_CHAT_BY_PROJECT_FAILURE, FETCH_CHAT_BY_PROJECT_REQUEST, FETCH_CHAT_BY_PROJECT_SUCCESS, FETCH_CHAT_MESSAGES_FAILURE, FETCH_CHAT_MESSAGES_REQUEST, FETCH_CHAT_MESSAGES_SUCCESS, SEND_MESSAGES_FAILURE, SEND_MESSAGES_REQUEST, SEND_MESSAGES_SUCCESS } from "./ActionTypes"

export const sendMessage = (messageData) => {
    return async (dispatch) => {
        dispatch({ type: SEND_MESSAGES_REQUEST });
        try {
            const response = await api.post(
                "/api/messages/send",
                messageData
            );
            dispatch({
                type: SEND_MESSAGES_SUCCESS, payload: response.data
            });
            console.log("message sent ", response.data);
        } catch (error) {
            console.log(error);
            dispatch({
                type: SEND_MESSAGES_FAILURE,
                error: error.message
            });
        }
    };
};

export const fetchChatByProject = (projectId) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_CHAT_BY_PROJECT_REQUEST });
        try {
            const response = await api.get(
                `/api/projects/${projectId}/chat`);
            console.log("fetch chat ", response.data);
            dispatch({
                type: FETCH_CHAT_BY_PROJECT_SUCCESS, payload: response.data
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: FETCH_CHAT_BY_PROJECT_FAILURE,
                error: error.message
            });
        }
    };
};

export const fetchChatMessages = (projectId) => {
    return async (dispatch) => {
        dispatch({type:FETCH_CHAT_MESSAGES_REQUEST});
        try{
            const response = await api.get(
                `/api/messages/chat/${projectId}`);
            console.log("fetched messages", response.data);
            dispatch({
                type: FETCH_CHAT_MESSAGES_SUCCESS, projectId, payload:response.data
            });
        }catch(error){
            console.log(error);
            dispatch({
                type: FETCH_CHAT_MESSAGES_FAILURE,
                error: error.message
            });
        }
    };
};