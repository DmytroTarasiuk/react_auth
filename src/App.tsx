import React, {useContext} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AuthPage from './pages/AuthPage';
import AdminPage from './pages/AdminPage';
import AuthContext from './store/auth-context';


function App() {

  const authCtx = useContext(AuthContext);

  return (
      <Switch>

        <Route path='/' exact>
          <AuthPage />
        </Route>

        <Route path='/admin'>
          {authCtx.isLoggedIn && <AdminPage />}
          {!authCtx.isLoggedIn && <Redirect to='/' />}
        </Route>

        <Route path='*'>
          <Redirect to='/' />
        </Route>

      </Switch>
  );
}

export default App;
