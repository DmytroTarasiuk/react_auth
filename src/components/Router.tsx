import React, { useContext } from "react";
import { Switch, Route} from "react-router-dom";

import AuthContext from "../store/auth-context";
import AuthLayout from "./Layout/AuthLayout"
import Layout from "./Layout";
import { ROUTES } from "../routes";
import { useHistory } from "react-router-dom";

const Router: React.FC = () => {

  const authCtx = useContext(AuthContext);
  const history = useHistory()

  const authGuard = (component: any) => {
    if (authCtx.isLoggedIn) {
      return component
    } else {
       history.replace(ROUTES.AUTH)
    }
  }

  return (
    <Switch>
      <Route exact path={ROUTES.AUTH} component={AuthLayout} />
      <Route exact path={ROUTES.DASHBOARD} component={authGuard(Layout)} />
    </Switch>
  );
};
export default Router;
