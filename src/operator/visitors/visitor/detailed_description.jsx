import React from 'react';
import Timestamp from './timestamp';

export default class DetailedDescription extends React.Component {
    render() {
        const invitationTime = this.props.invitationTime
            ? <Timestamp value={this.props.invitationTime} />
            : '-';

        return (
            <div>
                <div className="first-time">
                    First seen: <Timestamp value={this.props.firstTime} />
                </div>
                <div className="last-time">
                    Last seen: <Timestamp value={this.props.lastTime} />
                </div>
                <div className="remote-address">
                    Address: {this.props.remoteAddress}
                </div>
                <div className="user-agent">
                    User agent: {this.props.userAgent}
                </div>
                <div className="invited-by">
                    Invited by: {this.props.invitedBy}
                </div>
                <div className="invitation-time">
                    Invitation time: {invitationTime}
                </div>
                <div className="chats-count">
                    Chats: {this.props.chatsCount}
                </div>
                <div className="invitations-count">
                    Invitations: {this.props.invitationsCount}
                </div>
            </div>
        );
    }
};

DetailedDescription.propTypes = {
    firstTime: React.PropTypes.number.isRequired,
    lastTime: React.PropTypes.number.isRequired,
    remoteAddress: React.PropTypes.string.isRequired,
    ip: React.PropTypes.string.isRequired,
    invitationsCount: React.PropTypes.number.isRequired,
    chatsCount: React.PropTypes.number.isRequired,
    invitedBy: React.PropTypes.string,
    invitationTime: React.PropTypes.number,
    userAgent: React.PropTypes.string
};

DetailedDescription.defaultProps = {
    invitationTime: null,
    invitedBy: '-',
    userAgent: 'Unknown'
};
