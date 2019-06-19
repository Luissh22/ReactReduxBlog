import { User, Post } from '../models';
import { AnyAction } from 'redux';

export enum PostsActionType {
  fetchPosts = 'FETCH_POSTS'
}

export enum UserActionType {
  fetchUser = 'FETCH_USER'
}

export interface FetchPostsAction {
  type: PostsActionType.fetchPosts;
  payload: Post[];
}

export type PostsActions = FetchPostsAction & AnyAction;

export interface FetchUserAction {
  type: UserActionType.fetchUser;
  payload: User;
}

export type UserActions = FetchUserAction & AnyAction;
export type FetchPostsAndUserActions =
  | FetchPostsAction
  | FetchUserAction & AnyAction;
