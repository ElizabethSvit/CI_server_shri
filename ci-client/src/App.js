import React, {useState} from 'react';
import './App.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Start from "./components/Start";
import Settings from "./components/Settings";
import History from "./components/History";
import Details from "./components/Details";

export default function App() {
    const [mainRoute, updateRoute] = useState(null);
    !mainRoute &&
        fetch('/api/settings')
            .then(res => {
                return res.json();
            }).then(res => {
                Object.keys(res.data).length ? updateRoute((<History />)) : updateRoute((<Start />));
        }).then(() => {console.log(mainRoute, 'mainRoute');});


    return (
        <Router>
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route exact path="/">{mainRoute}</Route>
                    <Route path="/settings" component={Settings} />
                    <Route path="/history" component={History} />
                    <Route path="/build/:number" component={Details} />
                </Switch>
        </Router>
    );
}

// export default App;
