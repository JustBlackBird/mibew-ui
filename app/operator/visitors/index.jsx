import React from 'react';
import Visitor from './visitor';

export default React.createClass({
    propTypes: {
        visitors: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
            firstSeen: React.PropTypes.number.isRequired,
            lastSeen: React.PropTypes.number.isRequired,
            address: React.PropTypes.string,
            invitedBy: React.PropTypes.string,
            invitiationTime: React.PropTypes.number,
            invitationsCount: React.PropTypes.number,
            chatsCount: React.PropTypes.number
        })).isRequired
    },

    handleInvite(visitorId) {
        alert(`${visitorId} is invited`);
    },

    render() {
        let visitors = this.props.visitors.map(visitor => <Visitor
            {...visitor}
            key={visitor.id}
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
