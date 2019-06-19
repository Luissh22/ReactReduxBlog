import { Post } from '../models';
import { PostsActions, PostsActionType } from '../actions/types';

export interface PostsStoreState {
  posts: Post[];
}

const INITIAL_STATE: PostsStoreState = {
  posts: []
};

export const postReducer = (
  state: PostsStoreState = INITIAL_STATE,
  action: PostsActions
): PostsStoreState => {
  switch (action.type) {
    case PostsActionType.fetchPosts:
      return {
        posts: [...state.posts, ...action.payload]
      };
    default:
      return state;
  }
};
