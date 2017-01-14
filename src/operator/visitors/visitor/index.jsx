import React from 'react';
import DetailedDescription from './detailed_description';
import InviteButton from './invite_button';
import {ListGroupItem} from 'react-bootstrap';

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
            <ListGroupItem>
                <div>
                    <span className="visitor-name">
                        <strong>{this.props.name}</strong>
                    </span>(
                        {this.renderDetailsButton()}&nbsp;
                        <InviteButton
                            isInvited={this.props.isInvited}
                            onClick={this.props.onInvite}
                        />
                    )
                </div>
                {this.renderDetails()}
            </ListGroupItem>
        );
    }

    renderDetailsButton() {
        let callback, caption;

        if (this.state.isExpanded) {
            callback = this.handleDetailsHideClick.bind(this);
            caption = 'hide details';
        } else {
            callback = this.handleDetailsShowClick.bind(this);
            caption = 'show details';
        }

        return <a className="details-button" onClick={callback}>{caption}</a>;
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
