import React from 'react';

export default class InviteButton extends React.Component {
    handleClick(event) {
        event.preventDefault();
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        if (this.props.isInvited) {
            return null;
        }

        return <a onClick={this.handleClick.bind(this)}>invite</a>;
    }
};

InviteButton.propTypes = {
    isInvited: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func
};
