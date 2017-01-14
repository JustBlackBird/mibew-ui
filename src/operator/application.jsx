import React from 'react';
import Visitors from './visitors';
import * as actions from './actions';
import {Grid, Row, Col} from 'react-bootstrap';

export default class Application extends React.Component {
    handleInvite(visitorId) {
        this.props.dispatch(actions.inviteVisitor(visitorId));
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col md={8} mdOffset={2}>
                        <h1>Operator's home</h1>
                        <p>This is an operator's application!</p>
                        <hr />
                        <Visitors
                            visitors={this.props.visitors}
                            onInvite={this.handleInvite.bind(this)}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
};

Application.propTypes = {
    visitors: React.PropTypes.array.isRequired,
    dispatch: React.PropTypes.func.isRequired
};
