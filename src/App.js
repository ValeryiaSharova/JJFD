import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Login from './pages/loginPage/login';
import Main from './pages/mainPage/main';
import Users from './pages/usersPage/usersPage';
import Header from './components/header';
import UserEdit from './pages/userPage/userEdit';
import { ProfessionProvider } from './hooks/useProfession';
import AuthProvider from './hooks/useAuth';
import ProtectedRoute from './components/protectedRoute';
import LogOut from './components/logOut';
import { loadQualitiesList } from './store/qualities';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);
  return (
    <>
      <AuthProvider>
        <Header />
        <Switch>
          <ProfessionProvider>
            <Route path="/" exact component={Main} />
            <Route path="/logout" component={LogOut} />
            <Route path="/login/:type?" component={Login} />
            <ProtectedRoute path="/users/:userId?" exact component={Users} />
            <ProtectedRoute path="/users/:userId?/edit" exact component={UserEdit} />
          </ProfessionProvider>
        </Switch>
      </AuthProvider>
      <ToastContainer />
    </>
  );
};
export default App;
