import React from 'react';
import Visitor from './visitor';

export default React.createClass({
    handleInvite(visitorId) {
        alert(`${visitorId} is invited`);
    },

    render() {
        let visitors = this.props.visitors.map(visitor => <Visitor
            {...visitor}
            key={visitor.id}
            onInvite={this.handleInvite}
        />);

        return (
            <div>
                <h2>Visitors on site</h2>
                <hr />
                <div>{visitors}</div>
            </div>
        );
    }
});
