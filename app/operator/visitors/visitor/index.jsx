import React from 'react';
import DetailedDescription from './detailed_description';
import InviteButton from './invite_button';

export default React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        firstTime: React.PropTypes.number.isRequired,
        lastTime: React.PropTypes.number.isRequired,
        onInvite: React.PropTypes.func.isRequired,
        ip: React.PropTypes.string,
        remoteAdress: React.PropTypes.string,
        userAgent:  React.PropTypes.string,
        invitedBy: React.PropTypes.string,
        invitationTime: React.PropTypes.number,
        invitationsCount: React.PropTypes.number,
        chatsCount: React.PropTypes.number
    },

    getDefaultProps() {
        return {
            chatsCount: 0,
            invitationsCount: 0,
            remoteAddress: '-',
            ip: '-',
            invitedBy: null,
            invitationTime: null
        };
    },

    getInitialState() {
        return {isExpanded: false};
    },

    handleDetailsShowClick(event) {
        event.preventDefault();
        this.setState({isExpanded: true});
    },

    handleDetailsHideClick(event) {
        event.preventDefault();
        this.setState({isExpanded: false});
    },

    handleInviteClick(event) {
        event.preventDefault();
        this.props.onInvite(this.props.id);
    },

    render() {
        let details = null;
        if (this.state.isExpanded) {
            details = <DetailedDescription {...this.props} />;
        }

        const detailsButton = this.state.isExpanded
            ? <a onClick={this.handleDetailsHideClick}>hide details</a>
            : <a onClick={this.handleDetailsShowClick}>show details</a>;

        return (
            <div>
                <div>
                    <strong>{this.props.name}</strong>(
                        {detailsButton}&nbsp;
                        <InviteButton
                            isInvited={!!this.props.invitedBy}
                            onClick={this.handleInviteClick}
                        />
                    )
                </div>
                {details}
            </div>
        );
    }
});
