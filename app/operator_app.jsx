import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {connect, Provider} from 'react-redux';
import thunk from 'redux-thunk';
import OperatorApp from './operator/application.jsx';
import operatorReducers from './operator/reducers';

let reducers = combineReducers({operator: operatorReducers});

export function run(initialState, rootElement) {
    let store = createStore(reducers, initialState, applyMiddleware(thunk));
    let ConnectedOperatorApp = connect(state => state.operator)(OperatorApp);

    ReactDOM.render(
        <Provider store={store}>
            <ConnectedOperatorApp />
        </Provider>,
        rootElement
    );
};
