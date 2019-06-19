import { combineReducers } from 'redux';
import { postReducer, PostsStoreState } from './postReducer';
import { UsersStoreState, usersReducer } from './userReducer';

export interface StoreState {
  postsReducer: PostsStoreState;
  usersReducer: UsersStoreState;
}

export const reducers = combineReducers<StoreState>({
  postsReducer: postReducer,
  usersReducer: usersReducer
});
