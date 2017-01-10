import React from 'react';

export default class InviteButton extends React.Component {
    render() {
        if (this.props.isInvited) {
            return null;
        }

        return <a onClick={this.props.onClick}>invite</a>;
    }
};

InviteButton.propTypes = {
    isInvited: React.PropTypes.bool.isRequired
};
