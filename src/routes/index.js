import { Application } from 'containers';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { history } from 'store/configureStore';

const App = () => {
    return (
        <Router history={history}>
            <Application/>
        </Router>
    )
}

export default App;