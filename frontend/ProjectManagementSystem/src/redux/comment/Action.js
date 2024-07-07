import api from "@/config/api";
import { CREATE_COMMENT_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE, DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, FETCH_COMMENTS_FAILURE, FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS } from "./ActionTypes"

export const createComment = (commentData) => {
    
    return async (dispatch) => {
        dispatch({ type: CREATE_COMMENT_REQUEST });
        try {
            const response = await api.post(
                `/api/comments`,
                commentData
            );
            console.log("comment created ", response.data);
            dispatch({
                type: CREATE_COMMENT_SUCCESS,
                comment: response.data
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: CREATE_COMMENT_FAILURE,
                error: error.message,
            });
        }
    };
};

export const deleteComment = (commentId) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_COMMENT_REQUEST });
        try {
            const response = await api.delete(
                `/api/comments/${commentId}`
            );
            console.log("comment deleted ", response.data);
            dispatch({
                type: DELETE_COMMENT_SUCCESS,
                commentId
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: DELETE_COMMENT_FAILURE,
                error: error.message,
            });
        }
    };
};

export const fetchComments = (issueId) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_COMMENTS_REQUEST });
        try {
            const response = await api.get(
                `/api/comments/${issueId}`
            );
            // console.log("comment created ", response.data);
            dispatch({
                type: FETCH_COMMENTS_SUCCESS,
                comment: response.data
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: FETCH_COMMENTS_FAILURE,
                error: error.message,
            });
        }
    };
};