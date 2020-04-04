import React from 'react';
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
import SettingsForm from "./components/SettingsForm";

export default function App() {
    return (
        <Router>
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route exact path="/" component={Start}>
                    </Route>
                    <Route path="/settings" component={Settings}>
                    </Route>
                    <Route path="/history" component={History}>
                    </Route>
                    <Route path="/build/:number" component={Details}>
                    </Route>
                </Switch>
        </Router>
    );
}

// function Start() {
//     return <h2>Start</h2>;
// }
//
// function About() {
//     return <h2>About</h2>;
// }
//
// function Users() {
//     return <h2>Users</h2>;
// }

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
