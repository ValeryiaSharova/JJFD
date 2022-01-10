import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/loginPage/login';
import Main from './pages/mainPage/main';
import Users from './pages/usersPage/users';
import Header from './sharedComponents/header';

const App = () => (
  <>
    <Header />
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/users" component={Users} />
    </Switch>
  </>
);
export default App;
