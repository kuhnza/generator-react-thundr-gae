import { AppContainer } from 'react-hot-loader';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as AppModule from './components/App';
import "../less/styles/main.less";

const rootEl = document.getElementById('root');
const render = (Component: any) =>
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        rootEl
    );

// Tricky dynamic module loading here is essential to making HMR work with TypeScript
let app: typeof AppModule = require('./components/App');
render(app.App);

if (module.hot) {
    module.hot.accept('./components/App', () => {
        app = require('./components/App'); // Dynamic reload
        render(app.App);
    });
}