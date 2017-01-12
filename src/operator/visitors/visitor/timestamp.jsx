import React from 'react';
import moment from 'moment';

export default class Timestamp extends React.Component {
    render() {
        return <span>{moment.unix(this.props.value).fromNow()}</span>;
    }
};

Timestamp.propTypes = {
    value: React.PropTypes.number.isRequired
};
