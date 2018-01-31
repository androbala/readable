import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import RightNav from './RightNav';
import PostsList from './PostsList';
import PostDetail from './PostDetail';
import NewPost from './NewPost';
import EditPost from './EditPost';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RightNav/>
        <Route exact path="/" render={() => (
          <div className="posts-list">
            <PostsList/>
          </div>
        )}/>
        <Route exact path="/:id/edit" render={ ({match, history}) =>
                            <EditPost postId={match.params.id} history={history}/>
        }/>
        <Route exact path="/new" render={({history}) =>
                          <NewPost history={history} />
        }/>
        <Route exact path="/:category" render={ ({match}) =>
          <PostsList category={match.params.category}/>
        }/>
        <Route exact path="/:category/:id" render={ ({match, history}) =>
          <PostDetail postId={match.params.id} history={history}/>
        }/>
      </div>
    );
  }
}

export default App;
