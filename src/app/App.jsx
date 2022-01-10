import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/navBar';
import Dashboard from './components/dashboard';
import Login from './components/login';
import Posts from './components/posts';
import Home from './components/home';
import NotFound from './components/not-found';

const App = () => {
  return (
    <>
      <NavBar />
      <h1>HI!</h1>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/posts/:postId?" component={Posts} />
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </>
  );
};

export default App;
