import React from 'react';

export default React.createClass({
    propTypes: {
        isInvited: React.PropTypes.bool.isRequired
    },

    render() {
        if (this.props.isInvited) {
            return null;
        }

        return <a onClick={this.props.onClick}>invite</a>;
    }
});
