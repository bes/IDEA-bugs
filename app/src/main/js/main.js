import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { store } from './redux/store/store';
import { AppRouter } from "./views/app-router";

const target = document.getElementById("root");

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component store={store}/>
        </AppContainer>,
        target
    );
};

render(AppRouter);

// Enable hot reloading
// https://github.com/gaearon/react-hot-loader/tree/master/docs#migration-to-30
if (module.hot) {
    module.hot.accept('./views/app-router', () => {
        render(AppRouter);
    });
}
