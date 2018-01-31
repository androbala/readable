import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PostList from './PostList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Readable</h1>
        </header>
        <Route exact path="/" render={() => (
          <div>
            <PostList/>
          </div>
        )}/>
      </div>
    );
  }
}

export default App;
