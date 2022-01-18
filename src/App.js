import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/loginPage/login';
import Main from './pages/mainPage/main';
import Users from './pages/usersPage/usersPage';
import Header from './components/header';
import UserEdit from './pages/userPage/userEdit';

const App = () => (
  <>
    <Header />
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/login/:type?" component={Login} />
      <Route path="/users/:userId?/edit" component={UserEdit} />
      <Route path="/users/:userId?" component={Users} />
    </Switch>
  </>
);
export default App;
