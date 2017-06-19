import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import combinedReducers from '../repos/index';

function configureStore(initialState) {
    const middlewares = [
        thunk,
    ];

    let composeEnhancers = compose;

    if (process.env.NODE_ENV === `development`) {
        // Logger must be last in middleware chain
        middlewares.push(logger);

        if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
            composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
        }
    }

    const enhancer = composeEnhancers(
        applyMiddleware(...middlewares),
    );

    const store = createStore(
        combinedReducers, // The reducer (or combined reducers)
        initialState, // Optional initial state
        enhancer, // Optional enhancer
    );

    return store;
}

const store = configureStore();

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    // ./ resolves as a webpack module and needs an index.js file
    module.hot.accept('../repos', () => {
        store.replaceReducer(require('../repos/index'));
    });
}

export {
    store,
};
