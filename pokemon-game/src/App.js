import { Route, Switch, Redirect, useLocation } from "react-router-dom";

import HomePage from "./routes/Home";
import GamePage from "./routes/Game";
import AboutPage from "./routes/About";
import ContactPage from "./routes/Contact";
import NotFoundPage from "./routes/NotFound";
import MenuHeader from "./components/MenuHeader/MenuHeader";
import Footer from "./components/Footer/Footer";
import PrivateRoute from "./components/PrivateRoute";
import { FirebaseContext } from "./context/Firebase";
import cn from "classnames";
import { NotificationContainer } from "react-notifications";
import style from "./style.modules.css";
/* import Firebase from "./services/firebase"; */
import FirebaseClass from "./services/firebase";
import "react-notifications/lib/notifications.css";
function App() {
  const location = useLocation();
  const isPadding =
    location.pathname === "/" || location.pathname === "/game/board";

  return (
    <FirebaseContext.Provider value={FirebaseClass}>
      <Switch>
        <Route path="/404" component={NotFoundPage} />
        <Route>
          <>
            <MenuHeader bgActive={!isPadding} />
            <div className={cn(style.wrap, { [style.isHomepage]: isPadding })}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/home" component={HomePage} />
                <PrivateRoute path="/game" component={GamePage} />
                <PrivateRoute path="/about" component={AboutPage} />
                <PrivateRoute path="/contact" component={ContactPage} />
                <Route render={() => <Redirect to="/404" />} />
              </Switch>
            </div>
            <Footer />
          </>
        </Route>
      </Switch>
      <NotificationContainer />
    </FirebaseContext.Provider>
  );
}

export default App;
