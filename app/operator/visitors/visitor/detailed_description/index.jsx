import React from 'react';

export default React.createClass({
    propTypes: {
        firstSeen: React.PropTypes.instanceOf(Date).isRequired,
        lastSeen: React.PropTypes.instanceOf(Date).isRequired,
        address: React.PropTypes.string.isRequired,
        invitedBy: React.PropTypes.string,
        invitationTime: React.PropTypes.number,
        invitationsCount: React.PropTypes.number.isRequired,
        chatsCount: React.PropTypes.number.isRequired
    },

    getDefaultProps() {
        return {
            invitationTime: '-',
            invitedBy: '-'
        };
    },

    render() {
        return (
            <dl>
                <dt>First seen:</dt>
                <dd>{this.props.firstSeen.toString()}</dd>
                <dt>Last seen:</dt>
                <dd>{this.props.lastSeen.toString()}</dd>
                <dt>Address:</dt>
                <dd>{this.props.address}</dd>
                <dt>Invited by</dt>
                <dd>{this.props.invitedBy}</dd>
                <dt>Invitation Time:</dt>
                <dd>{this.props.invitationTime}</dd>
                <dt>Invitations / Chats:</dt>
                <dd>{this.props.invitationsCount} / {this.props.chatsCount}</dd>
            </dl>
        );
    }
});
