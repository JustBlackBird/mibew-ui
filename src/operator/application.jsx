import React from 'react';
import Visitors from './visitors';
import * as actions from './actions';

export default React.createClass({
    propTypes: {
        visitors: React.PropTypes.array.isRequired,
        dispatch: React.PropTypes.func.isRequired
    },

    handleInvite(visitorId) {
        this.props.dispatch(actions.inviteVisitor(visitorId));
    },

    render() {
        return (
            <div>
                <h1>Operator's home</h1>
                <p>This is an operator's application!</p>
                <hr />
                <Visitors
                    visitors={this.props.visitors}
                    onInvite={this.handleInvite}
                />
            </div>
        );
    }
});
