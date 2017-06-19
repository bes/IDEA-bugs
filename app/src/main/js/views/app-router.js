import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { BaseView } from "./base-view";

class AppRouter extends React.Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
    }

    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <Provider store={this.props.store}>
                <BrowserRouter>
                    <Route path="/" component={BaseView}/>
                </BrowserRouter>
            </Provider>
        );
    }
}

export { AppRouter };
