import React from 'react';
import Visitors from './visitors';

export default React.createClass({
    render() {
        return (
            <div>
                <h1>Operator's home</h1>
                <p>This is an operator's application!</p>
                <hr />
                <Visitors
                    visitors={this.props.visitors}
                    dispatch={this.props.dispatch}
                />
            </div>
        );
    }
});
