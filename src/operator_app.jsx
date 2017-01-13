import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {connect, Provider} from 'react-redux';
import thunk from 'redux-thunk';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import App from './operator/application.jsx';
import * as actions from './operator/actions'
import operatorReducers from './operator/reducers';
import Server from './operator/server';

let reducers = combineReducers({operator: operatorReducers});

export function run(serverUrl, initialState, rootElement) {
    let store = createStore(
        reducers,
        initialState,
        applyMiddleware(thunk)
    );
    let ConnectedApp = connect(state => state.operator)(App);

    let server = new Server(serverUrl, initialState.operator.id);
    server.on('visitors_updated', (visitors) => {
        store.dispatch(actions.updateVisitors(visitors))
    });

    ReactDOM.render(
        <Provider store={store}>
            <ConnectedApp />
        </Provider>,
        rootElement
    );
};
