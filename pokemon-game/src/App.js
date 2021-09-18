import { useRouteMatch, Route, Switch, Redirect } from "react-router-dom";

import HomePage from "./routes/Home";
import GamePage from "./routes/Game";
import AboutPage from "./routes/About";
import ContactPage from "./routes/Contact";
import NotFoundPage from "./routes/NotFound";
import MenuHeader from "./components/MenuHeader/MenuHeader";
import Footer from "./components/Footer/Footer";

import cn from "classnames";

import style from "./style.modules.css";

function App() {
  const match = useRouteMatch("/");

  return (
    <Switch>
      <Route path="/404" component={NotFoundPage} />
      <Route>
        <>
          <MenuHeader bgActive={!match.isExact} />
          <div
            className={cn(style.wrap, { [style.isHomepage]: match.isExact })}
          >
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/home" component={HomePage} />
              <Route path="/game" component={GamePage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/contact" component={ContactPage} />
              <Route render={() => <Redirect to="/404" />} />
            </Switch>
          </div>
          <Footer />
        </>
      </Route>
    </Switch>
  );
}

export default App;
