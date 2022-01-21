import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AuthPage from './pages/AuthPage';

import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage'
import Layout from './components/UI/Layout';
import AuthContext from './store/auth-context';


function App() {

  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}
        <Route path='/profile'>
          {authCtx.isLoggedIn && <ProfilePage />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>
       <Route path='/cart'>
          {authCtx.isLoggedIn && <CartPage />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
