import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {connect, Provider} from 'react-redux';
import OperatorApp from './operator/application.jsx';
import operatorReducers from './operator/reducers';

let reducers = combineReducers({operator: operatorReducers});

export function run(initialState, rootElement) {
    let store = createStore(reducers, initialState);
    let ConnectedOperatorApp = connect(state => state.operator)(OperatorApp);

    ReactDOM.render(
        <Provider store={store}>
            <ConnectedOperatorApp />
        </Provider>,
        rootElement
    );
};
