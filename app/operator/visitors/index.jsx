import React from 'react';
import Visitor from './visitor';
import * as actions from '../actions'

export default React.createClass({
    propTypes: {
        visitors: React.PropTypes.arrayOf(React.PropTypes.shape({
            userId: React.PropTypes.string.isRequired
        })).isRequired,
        dispatch: React.PropTypes.func.isRequired
    },

    handleInvite(visitorId) {
        this.props.dispatch(actions.inviteVisitor(visitorId));
    },

    render() {
        let visitors = this.props.visitors.map(visitor => <Visitor
            {...visitor}
            key={visitor.userId}
            onInvite={this.handleInvite}
        />);

        return (
            <div>
                <h2>Visitors on site</h2>
                <hr />
                <div>{visitors}</div>
            </div>
        );
    }
});
