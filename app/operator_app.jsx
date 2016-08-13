import React from 'react';
import ReactDOM from 'react-dom';
import Application from './operator/application.jsx';


export function run(initialState, rootElement) {
    ReactDOM.render(
        <Application />,
        rootElement
    );
};
