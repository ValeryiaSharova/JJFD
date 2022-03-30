import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/loginPage/login';
import Main from './pages/mainPage/main';
import Users from './pages/usersPage/usersPage';
import Header from './components/header';
import UserEdit from './pages/userPage/userEdit';
import ProtectedRoute from './components/protectedRoute';
import LogOut from './components/logOut';
import AppLoader from './components/hoc/appLoader';

const App = () => {
  return (
    <>
      <AppLoader>
        <Header />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/logout" component={LogOut} />
          <Route path="/login/:type?" component={Login} />
          <ProtectedRoute path="/users/:userId?" exact component={Users} />
          <ProtectedRoute path="/users/:userId?/edit" exact component={UserEdit} />
        </Switch>
      </AppLoader>
      <ToastContainer />
    </>
  );
};
export default App;
