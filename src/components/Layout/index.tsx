import React from "react";

import { Switch, Route } from "react-router-dom";
import AdminPage from "../../pages/AdminPage";

const Layout: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/dashboard"render={() => <AdminPage />}>
      </Route>
    </Switch>
  );
};

export default Layout;
