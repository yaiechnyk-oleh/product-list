import { Comment } from '../../types/commentTypes';

interface CommentState {
    comments: Comment[];
    loading: boolean;
    error: string | null;
}

interface CommentAction {
    type: string;
    payload: any;
}

const initialState: CommentState = {
    comments: [],
    loading: false,
    error: null
};

function commentReducer(state = initialState, action: CommentAction): CommentState {
    switch (action.type) {
        case 'FETCH_COMMENTS_SUCCESS':
            return {
                ...state,
                comments: action.payload,
                loading: false
            };
        case 'FETCH_COMMENTS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export default commentReducer;
