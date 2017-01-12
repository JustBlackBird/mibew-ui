import React from 'react';
import Thread from './thread';

export default class Threads extends React.Component {
    render() {
        const threads = this.props.threads.map(thread => <Thread
            key={thread.id}
            {...thread}
        />);

        return <div>{threads}</div>;
    }
};

Threads.propTypes = {
    threads: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.number.isRequired
    }))
};
