import React from 'react';

export default class Thread extends React.Component {
    render() {
        return <div className="user-name">
            User name: {this.props.userName}
        </div>;
    }
};

Thread.propTypes = {
    userName: React.PropTypes.string.isRequired
};
