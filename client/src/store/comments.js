import { createSlice, nanoid } from '@reduxjs/toolkit';
import commentService from '../services/comment.service';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    commentsRequested: state => {
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
    commentDeleted: (state, action) => {
      state.entities = state.entities.filter(c => c._id !== action.payload);
    },
    commentCreated: (state, action) => {
      state.entities.push(action.payload);
    },
  },
});

const { actions, reducer: commentsReducer } = commentsSlice;
const {
  commentsReceived,
  commentsRequestFailed,
  commentsRequested,
  commentDeleted,
  commentCreated,
} = actions;

export const loadCommentsList = userId => async dispatch => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(userId);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const removeComment = commentId => async dispatch => {
  try {
    const { content } = await commentService.removeComment(commentId);
    if (content === null) {
      dispatch(commentDeleted(commentId));
    }
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const createComment = (data, currentUserId, userId) => async dispatch => {
  const comment = {
    ...data,
    _id: nanoid(),
    pageId: userId,
    created_at: Date.now(),
    userId: currentUserId,
  };
  try {
    const { content } = await commentService.createComment(comment);
    dispatch(commentCreated(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const getComments = () => state => state.comments.entities;
export const getCommentsLoadingStatus = () => state => state.comments.isLoading;

export default commentsReducer;
