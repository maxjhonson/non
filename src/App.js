import "bootstrap/dist/css/bootstrap.css";
import * as $ from "jquery/dist/jquery.js";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Admin from "./components/administration/Admin";
//import Custumer from "./components/custumer/Custumer";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
            return <Redirect to="/c" />;
          }}
        ></Route>
        <Route path="/c" component={null}></Route>
        <Route path="/admin" component={Admin}></Route>
      </Switch>
    </Router>
  );
}

export default App;
