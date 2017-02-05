import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import "../less/styles/main.less";
import * as AppModule from "./components/App";

const rootEl = document.getElementById("root");
const render = (Component: any) =>
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        rootEl
    );

// Tricky dynamic module loading here is essential to making HMR work with TypeScript
let app: typeof AppModule = require("./components/App");
render(app.App);

// Hook into HMR update events to trigger reload of component hierarchy
if (DEVELOPMENT && module.hot) {
    module.hot.accept("./components/App", () => {
        app = require("./components/App"); // ...and here's our dynamic reload
        render(app.App);
    });
}
