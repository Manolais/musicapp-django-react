import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import { LandingPage, CreateRoomPage, JoinRoomPage } from "./pages";

const AppRouter = () => {
  /* 
  This is place to change every path in this frontend app,
  you dont need to use "index.js" or "App.js", just leave
  it as it is and make every change right here.
*/

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/join" component={JoinRoomPage} />
          <Route path="/create" component={CreateRoomPage} />
          <Route path="/404">
            <h1>Page not found</h1>
            <Link to="/">Go home</Link>
          </Route>

          {/* Redirecciona a 404 entrando a cualquier página que no esté declarada
           en el router o los urls.py */}
          <Redirect to="/404" />
        </Switch>
      </Router>
    </div>
  );
};

export default AppRouter;
