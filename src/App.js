import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Posts from './pages/posts/Posts';
import PostDetailed from './pages/post_detailed/PostDetailed';
import PostGraph from './pages/post_graph/PostGraph';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
      <div className="App">
        <NavigationBar/>
        <div className="main-content">
          <Switch>
            <Route
                path="/"
                exact
                component={Posts}
            />
            <Route
                path="/stories/id=:storyId"
                component={PostDetailed}
            />
            <Route
                path="/stories-graph/"
                component={PostGraph}
            />
          </Switch>
        </div>
      </div>
  );
};

export default withRouter(App);
