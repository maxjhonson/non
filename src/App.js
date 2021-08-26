import "bootstrap/dist/css/bootstrap.css";
import * as $ from "jquery/dist/jquery.js";
import "bootstrap/dist/js/bootstrap.js";

import Questionnaire from "./views/Administration/Questionnaire/Questionnaire";
import QuestionnaireCreate from "./views/Administration/Questionnaire/Create";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {/* <CountrySelection /> */}
          <p>--</p>
        </Route>
        <Route path="/q_usa">
          {/* <QuestionsList /> */}
          <p>--</p>
        </Route>
        <Route path="/q_eu">
          {/* <QuestionsList /> */}
          <p>--</p>
        </Route>
        <Route path="/Questionnaire/" exact>
          <Questionnaire />
        </Route>
        <Route path="/Questionnaire/Create/:id?">
          <nav class="navbar navbar-light bg-light">
            <div class="container-fluid">
              <span class="navbar-brand mb-0 h1">
                <Link to="/Questionnaire">Volver atras</Link>
              </span>
            </div>
          </nav>

          <QuestionnaireCreate />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
