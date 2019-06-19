import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchUser, fetchPostsAndUsers } from '../actions';
import { StoreState } from '../reducers';
import { Post, User } from '../models';
import { UserHeader } from './UserHeader';
import { Dispatch, AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { FetchPostsAction } from '../actions/types';

interface PostListStateProps {
  posts: Post[];
}
interface PostListDispatchProps {
  fetchPosts: () => void;
  fetchUser: (id: number) => void;
  fetchPostsAndUsers: () => void;
}

interface PostListProps extends PostListStateProps, PostListDispatchProps {}

class PostListImpl extends React.Component<PostListProps> {
  componentDidMount() {
    this.props.fetchPostsAndUsers();
  }

  renderListItem(post: Post): JSX.Element {
    return (
      <div className="item" key={post.id}>
        <i className="large middle aligned icon user" />
        <div className="content">
          <div className="description">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <UserHeader userId={post.userId} />
          </div>
        </div>
      </div>
    );
  }

  renderList(): JSX.Element[] {
    return this.props.posts.map((post: Post) => this.renderListItem(post));
  }

  render() {
    console.log(this.props.posts);
    return <div className="ui relaxed divided list">{this.renderList()}</div>;
  }
}

const mapStateToProps = (state: StoreState): PostListStateProps => {
  return {
    posts: state.postsReducer.posts
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StoreState, undefined, FetchPostsAction>
): PostListDispatchProps => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchUser: (id: number) => dispatch(fetchUser(id)),
    fetchPostsAndUsers: () => dispatch(fetchPostsAndUsers())
  };
};

export const PostList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListImpl);
