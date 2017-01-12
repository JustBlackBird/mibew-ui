import React from 'react';
import defaultTimeFormatter from './default_time_formatter';

export default class DetailedDescription extends React.Component {
    render() {
        const invitationTime = this.props.invitationTime
            ? this.props.timeFormatter(this.props.invitationTime)
            : '-';

        return (
            <div>
                <div className="first-time">
                    First seen: {this.props.timeFormatter(this.props.firstTime)}
                </div>
                <div className="last-time">
                    Last seen: {this.props.timeFormatter(this.props.lastTime)}
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
    userAgent: React.PropTypes.string,
    timeFormatter: React.PropTypes.func
};

DetailedDescription.defaultProps = {
    invitationTime: null,
    invitedBy: '-',
    userAgent: 'Unknown',
    timeFormatter: defaultTimeFormatter
};
