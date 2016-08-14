import React from 'react';
import DetailedDescription from './detailed_description';
import InviteButton from './invite_button';

export default React.createClass({
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
