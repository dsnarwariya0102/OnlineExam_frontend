import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "../admin/dashboard/Dashboard";
import SignIn from "../admin/login/SignIn";

export default function AdminRouter(props) {
  return (
    <div>
      <Router>
        <Route
          component={SignIn}
          path="/AdminLogin"
          exact
          strict
          history={props.history}
        />
        <Route
          component={Dashboard}
          path="/Dashboard"
          exact
          strict
          history={props.history}
        />
      </Router>
    </div>
  );
}
