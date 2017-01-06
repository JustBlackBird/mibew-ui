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
            invitationTime: null,
            invitedBy: '-'
        };
    },

    render() {
        return (
            <dl>
                <dt>First seen:</dt>
                <dd>{this._formatTimeDiff(this.props.firstTime)}</dd>
                <dt>Last seen:</dt>
                <dd>{this._formatTimeDiff(this.props.lastTime)}</dd>
                <dt>Address:</dt>
                <dd>{this.props.address}</dd>
                <dt>Invited by</dt>
                <dd>{this.props.invitedBy}</dd>
                <dt>Invitation Time:</dt>
                <dd>{this.props.invitationTime
                    ? this._formatTimeDiff(this.props.invitationTime)
                    : '-'}</dd>
                <dt>Invitations / Chats:</dt>
                <dd>{this.props.invitationsCount} / {this.props.chatsCount}</dd>
            </dl>
        );
    },

    _formatTimeDiff(timestamp) {
        return moment.unix(timestamp).fromNow();
    }
});
