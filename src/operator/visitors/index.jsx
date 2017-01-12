import React from 'react';
import Visitor from './visitor';

export default class Visitors extends React.Component {
    handleInvite(visitorId) {
        this.props.onInvite(visitorId);
    }

    render() {
        let visitors = this.props.visitors.map(visitor => <Visitor
            {...visitor}
            key={visitor.id}
            onInvite={() => {this.handleInvite(visitor.id)}}
        />);

        return (
            <div>
                <h2>Visitors on site</h2>
                <hr />
                <div>{visitors}</div>
            </div>
        );
    }
};

Visitors.propTypes = {
    visitors: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired
    })).isRequired,
    onInvite: React.PropTypes.func
};
