import { Fragment } from "react";
import AuthContext from "../store/auth-context";
import { useContext } from "react";
import AuthForm from "../components/Auth/AuthForm";
import React from "react";


const HomePage = () => {

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Fragment>
      {isLoggedIn ? <h1>Welcome to the Admin Panel</h1> : <AuthForm /> }
    </Fragment>
  );
};

export default HomePage;
