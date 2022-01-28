import React from 'react';

import AuthPage from '../../../pages/AuthPage';
import { Switch, Route } from 'react-router-dom'
import AuthForm from '../../Auth/AuthForm';
import classes from './AuthLayout.module.css'
import {
  Container
} from '@chakra-ui/react'


const AuthLayout: React.FC = () => {
  return (
  <Container maxW='xl' centerContent className={classes.container}>
    <AuthForm />
    <Switch>
      <Route exact path="/"render={() => <AuthPage />}>
      </Route>
    </Switch>
  </Container>
  );
};

export default AuthLayout;