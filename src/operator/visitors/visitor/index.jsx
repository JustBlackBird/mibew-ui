import React from 'react';
import DetailedDescription from './detailed_description';
import InviteButton from './invite_button';
import {ListGroupItem, Glyphicon} from 'react-bootstrap';

export default class Visitor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false
        };
    }

    handleDetailsShowClick(event) {
        event.preventDefault();
        this.setState({isExpanded: true});
    }

    handleDetailsHideClick(event) {
        event.preventDefault();
        this.setState({isExpanded: false});
    }

    render() {
        return (
            <ListGroupItem className="clearfix">
                <div>
                    <span className="visitor-name">
                        <strong>{this.props.name}</strong>
                    </span>
                    (<InviteButton
                        isInvited={this.props.isInvited}
                        onClick={this.props.onInvite}
                    />)
                    <span className="pull-right">
                        {this.renderDetailsButton()}
                    </span>
                </div>
                {this.renderDetails()}
            </ListGroupItem>
        );
    }

    renderDetailsButton() {
        let callback, glyph;

        if (this.state.isExpanded) {
            callback = this.handleDetailsHideClick.bind(this);
            glyph = 'chevron-up';
        } else {
            callback = this.handleDetailsShowClick.bind(this);
            glyph = 'chevron-down';
        }

        return <Glyphicon
            glyph={glyph}
            className="details-button"
            onClick={callback}
            role="button"
        />;
    }

    renderDetails() {
        return this.state.isExpanded
            ? <DetailedDescription {...this.props.details} />
            : null;
    }
};

Visitor.propTypes = {
    name: React.PropTypes.string.isRequired,
    isInvited: React.PropTypes.bool.isRequired,
    details: React.PropTypes.object.isRequired
};
