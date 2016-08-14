import React from 'react';

export default React.createClass({
    render() {
        if (this.props.isInvited) {
            return null;
        }

        return <a onClick={this.props.onClick}>invite</a>;
    }
});
