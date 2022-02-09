import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/loginPage/login';
import Main from './pages/mainPage/main';
import Users from './pages/usersPage/usersPage';
import Header from './components/header';
import UserEdit from './pages/userPage/userEdit';
import { ProfessionProvider } from './hooks/useProfession';
import { QualitiesProvider } from './hooks/useQualities';
import AuthProvider from './hooks/useAuth';

const App = () => (
  <>
    <AuthProvider>
      <Header />
      <Switch>
        <QualitiesProvider>
          <ProfessionProvider>
            <Route path="/login/:type?" component={Login} />
            <Route path="/users/:userId?" component={Users} />
            <Route path="/" exact component={Main} />
            <Route path="/users/:userId?/edit" component={UserEdit} />
          </ProfessionProvider>
        </QualitiesProvider>
      </Switch>
    </AuthProvider>
    <ToastContainer />
  </>
);
export default App;
