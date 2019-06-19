import React from 'react';
import { connect } from 'react-redux';
import { User } from '../models';
import { StoreState } from '../reducers';

interface UserHeaderStateProps {
  user: User;
}

interface UserHeaderReceivedProps {
  userId: number;
}

interface UserHeaderProps
  extends UserHeaderStateProps,
    UserHeaderReceivedProps {}

class UserHeaderImpl extends React.Component<UserHeaderProps> {
  render() {
    const { user } = this.props;
    if (!user) {
      return <div>Loading...</div>;
    }

    return <h4>{user.name}</h4>;
  }
}

const mapStateToProps = (
  state: StoreState,
  ownProps: UserHeaderReceivedProps
): UserHeaderStateProps => {
  const user = state.usersReducer.users.find(
    (user: User) => user.id === ownProps.userId
  );

  return {
    user: user
  };
};

export const UserHeader = connect(mapStateToProps)(UserHeaderImpl);
