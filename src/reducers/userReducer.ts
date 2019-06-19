import { User } from '../models';
import { UserActions, UserActionType } from '../actions/types';

export interface UsersStoreState {
  users: User[];
}

const INITIAL_STATE: UsersStoreState = {
  users: []
};

export const usersReducer = (
  state: UsersStoreState = INITIAL_STATE,
  action: UserActions
): UsersStoreState => {
  switch (action.type) {
    case UserActionType.fetchUser:
      return {
        users: [...state.users, action.payload]
      };
    default:
      return state;
  }
};
