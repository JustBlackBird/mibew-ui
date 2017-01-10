import React from 'react';
import DetailedDescription from './detailed_description';
import InviteButton from './invite_button';

export default React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        isInvited: React.PropTypes.bool.isRequired,
        details: React.PropTypes.object.isRequired
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
        return (
            <div>
                <div>
                    <strong>{this.props.name}</strong>(
                        {this.renderDetailsButton()}&nbsp;
                        <InviteButton
                            isInvited={this.props.isInvited}
                            onClick={this.handleInviteClick}
                        />
                    )
                </div>
                {this.renderDetails()}
            </div>
        );
    },

    renderDetailsButton() {
        let callback, caption;

        if (this.state.isExpanded) {
            callback = this.handleDetailsHideClick;
            caption = 'hide details';
        } else {
            callback = this.handleDetailsShowClick;
            caption = 'show details';
        }

        return <a className="details-button" onClick={callback}>{caption}</a>;
    },

    renderDetails() {
        return this.state.isExpanded
            ? <DetailedDescription {...this.props.details} />
            : null;
    }
});
