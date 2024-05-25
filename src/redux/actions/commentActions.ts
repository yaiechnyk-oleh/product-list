import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/commentTypes';
import { AppThunk } from '../store';

interface CommentsState {
    comments: Comment[];
    loading: boolean;
    error: string | null;
}

const initialState: CommentsState = {
    comments: [],
    loading: false,
    error: null
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        fetchCommentsStart(state) {
            state.loading = true;
        },
        fetchCommentsSuccess(state, action: PayloadAction<Comment[]>) {
            state.comments = action.payload;
            state.loading = false;
        },
        fetchCommentsFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const { fetchCommentsStart, fetchCommentsSuccess, fetchCommentsFailure } = commentsSlice.actions;

// Thunk action to fetch comments
export const fetchComments = (productId: number): AppThunk => async dispatch => {
    try {
        dispatch(fetchCommentsStart());
        const response = await fetch(`http://localhost:5000/comments?productId=${productId}`);
        const comments: Comment[] = await response.json();
        dispatch(fetchCommentsSuccess(comments));
    } catch (error) {
        dispatch(fetchCommentsFailure('Failed to fetch comments'));
    }
};

export default commentsSlice.reducer;
