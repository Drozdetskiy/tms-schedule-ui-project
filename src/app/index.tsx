import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { MainLayout } from '../layouts';

import './styles.css';
import { store } from '../store';
import { Provider } from 'react-redux';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <MainLayout/>
            </Router>
        </Provider>

    );
};


export { App };
