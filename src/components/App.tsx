import React from 'react';
import { PostList } from './PostList';

export class App extends React.Component {
  render() {
    return (
      <div className="ui container">
        <PostList />
      </div>
    );
  }
}
