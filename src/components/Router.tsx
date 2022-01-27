import React, { useContext } from "react";
import { Switch, Route, Redirect} from "react-router-dom";

import AuthContext from "../store/auth-context";
import AuthLayout from "./Layout/AuthLayout/AuthLayout";
import Layout from "./Layout";

const Router: React.FC = () => {
  const authCtx = useContext(AuthContext);


  return (
    <Switch>
      <Route exact path="/" component={AuthLayout} />

      {authCtx.isLoggedIn && <Route exact path="/dashboard" component={Layout} />}
      {!authCtx.isLoggedIn && <Redirect to="/" />}
    </Switch>
  );
};

export default Router;
