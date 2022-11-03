import { createSlice, createAction } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter((el) => {
                console.log("action.payload._id", action.payload._id);
                return el._id !== action.payload._id;
            });
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    commentCreated,
    commentRemoved
} = actions;

const commentCreateRequested = createAction("comments/commentCreateRequested");
const createCommentFailed = createAction("comments/createCommentFailed");
const commentRemoveRequested = createAction("comments/commentRemoveRequested");
const commentRemovedFailed = createAction("comments/createCommentFailed");

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export function createComment({ payload }) {
    return async function (dispatch) {
        dispatch(commentCreateRequested());
        try {
            const { content } = await commentService.createComment(payload);
            dispatch(commentCreated(content));
        } catch (error) {
            dispatch(createCommentFailed(error.message));
        }
    };
}

export const removeComment =
    ({ _id }) =>
    async (dispatch) => {
        dispatch(commentRemoveRequested());
        try {
            const { content } = await commentService.removeComment(_id);
            dispatch(commentRemoved(content));
        } catch (error) {
            dispatch(commentRemovedFailed(error.message));
        }
    };

export const getComments = () => (state) => state.comments.entities;

export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
