import Navigation from "./components/navigation/Navigation";
import { Switch, Route } from "react-router-dom";
import loadable from "@loadable/component";
import Redirector from "./components/Redirector";
const Home = loadable(() => import("./pages/Home"));
const NotFound = loadable(() => import("./pages/NotFound"));

function App() {
  return (
    <>
      <Switch>
        <Route path="/:code" component={Redirector} exact />
        <Route path="/">
          <Navigation />
          <Home />
        </Route>
        <Route path="*" component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
