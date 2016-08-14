import React from 'react';

export default React.createClass({
    render() {
        return (
            <dl>
                <dt>First seen:</dt>
                <dd>{this.props.firstSeen}</dd>
                <dt>Last seen:</dt>
                <dd>{this.props.lastSeen}</dd>
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
