import React from 'react';
import Visitors from './visitors';
import * as actions from './actions';

export default class Application extends React.Component {
    handleInvite(visitorId) {
        this.props.dispatch(actions.inviteVisitor(visitorId));
    }

    render() {
        return (
            <div>
                <h1>Operator's home</h1>
                <p>This is an operator's application!</p>
                <hr />
                <Visitors
                    visitors={this.props.visitors}
                    onInvite={this.handleInvite.bind(this)}
                />
            </div>
        );
    }
};

Application.propTypes = {
    visitors: React.PropTypes.array.isRequired,
    dispatch: React.PropTypes.func.isRequired
};
