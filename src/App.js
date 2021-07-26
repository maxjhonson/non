import "bootstrap/dist/css/bootstrap.css";
import QuestionsList from "./views/QuestionsList";
import CountrySelection from "./views/CountrySelection";
import Questionnaire from "./Administration/views/Questionnaire/Questionnaire";
import QuestionnaireCreate from "./Administration/views/Questionnaire/Create";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <CountrySelection />
        </Route>
        <Route path="/q_usa">
          <QuestionsList />
        </Route>
        <Route path="/q_eu">
          <QuestionsList />
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
