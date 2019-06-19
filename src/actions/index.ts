import {
  FetchPostsAction,
  PostsActionType,
  FetchUserAction,
  UserActionType,
  FetchPostsAndUserActions
} from './types';
import { jsonPlaceholderService } from '../services';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { StoreState } from '../reducers';
import { AnyAction } from 'redux';
import { Post, User } from '../models';
import { AxiosResponse } from 'axios';

export type ThunkResult<R, A extends AnyAction> = ThunkAction<
  R,
  StoreState,
  undefined,
  A
>;

export const fetchPosts = (): ThunkResult<Promise<void>, FetchPostsAction> => {
  return (dispatch: ThunkDispatch<StoreState, undefined, FetchPostsAction>) => {
    return jsonPlaceholderService.get<Post[]>('/posts').then(response => {
      dispatch({
        type: PostsActionType.fetchPosts,
        payload: response.data
      });
    });
  };
};

export const fetchUser = (
  id: number
): ThunkResult<Promise<void>, FetchUserAction> => {
  return (dispatch: ThunkDispatch<StoreState, undefined, FetchUserAction>) => {
    return jsonPlaceholderService
      .get<User>(`/users/${id}`)
      .then((response: AxiosResponse<User>) => {
        dispatch({
          type: UserActionType.fetchUser,
          payload: response.data
        });
      });
  };
};

export const fetchPostsAndUsers = (): ThunkResult<
  void,
  FetchPostsAndUserActions
> => {
  return (dispatch, getState: () => StoreState) => {
    dispatch(fetchPosts()).then(() => {
      const userIds = getState().postsReducer.posts.map(
        (post: Post) => post.userId
      );
      const uniqueUserIds = new Set(userIds);
      uniqueUserIds.forEach((userId: number) => dispatch(fetchUser(userId)));
    });
  };
};
