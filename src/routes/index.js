import React from 'react';
import {history} from 'store/configureStore';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Application} from 'containers';

const App = () => {
    return (
        <Router history={history}>
            <Application/>
        </Router>
    )
}

export default App;