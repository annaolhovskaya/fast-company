import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Users from "./layouts/users";
import Login from "./layouts/login";
import Main from "./layouts/main";
import UserPage from "./components/userPage";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/users/:userId" component={UserPage} />
                <Route path="/users" component={Users} />
                <Route path="/" exact component={Main} />
            </Switch>
        </div>
    );
}

export default App;
