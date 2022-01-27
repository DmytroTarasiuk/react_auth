import React from 'react';

import AuthPage from '../../../pages/AuthPage';
import { Switch, Route } from 'react-router-dom'

const AuthLayout: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/"render={() => <AuthPage />}>
      </Route>
    </Switch>
  );
};

export default AuthLayout;