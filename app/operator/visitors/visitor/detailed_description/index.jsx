import React from 'react';
import * as moment from 'moment';

export default React.createClass({
    propTypes: {
        firstTime: React.PropTypes.number.isRequired,
        lastTime: React.PropTypes.number.isRequired,
        remote: React.PropTypes.string.isRequired,
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
                <dd>{moment.unix(this.props.firstTime).fromNow()}</dd>
                <dt>Last seen:</dt>
                <dd>{moment.unix(this.props.lastTime).fromNow()}</dd>
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
