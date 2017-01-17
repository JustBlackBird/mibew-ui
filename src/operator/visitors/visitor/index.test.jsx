import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import * as sinon from 'sinon';
import * as faker from 'faker';
import {Glyphicon} from 'react-bootstrap';
import Visitor from './';
import InviteButton from './invite_button';
import DetailedDescription from './detailed_description';

const getFakeDetails = () => {
    return {
        firstTime: faker.random.number(1484024000, 1484044000),
        lastTime: faker.random.number(1484045000, 1484055100),
        remoteAddress: faker.internet.ip(),
        ip: faker.internet.ip(),
        invitationsCount: faker.random.number(0, 10),
        chatsCount: faker.random.number(0, 10),
        invitedBy: faker.name.findName(),
        invitationTime: faker.random.number(1484044500, 1484045000),
        userAgent: faker.internet.userAgent()
    };
};

const getFakeName = () => {
    return faker.name.findName();
};

describe('<Visitor />', () => {
    it('should display visitor name', () => {
        const name = faker.name.findName();

        const wrapper = shallow(<Visitor
            name={name}
            isInvited={false}
            details={getFakeDetails()}
        />);

        expect(wrapper.find('.visitor-name')).to.have.length(1);
        expect(wrapper.find('.visitor-name').text()).to.equal(name);
    });

    it('should have details button', () => {
        const wrapper = shallow(<Visitor
            name={getFakeName()}
            isInvited={false}
            details={getFakeDetails()}
        />);

        expect(wrapper.containsMatchingElement(
            <Glyphicon glyph="chevron-down" className="details-button" />
        )).to.be.true;
    });

    it('should change glyph on details buton on click', () => {
        const wrapper = mount(<Visitor
            name={getFakeName()}
            isInvited={false}
            details={getFakeDetails()}
        />);

        wrapper.find('.details-button').simulate('click');

        expect(wrapper.containsMatchingElement(
            <Glyphicon glyph="chevron-up" className="details-button" />
        )).to.be.true;
    });

    it('should restore original glyph on details button after two clicks', () => {
        const wrapper = mount(<Visitor
            name={getFakeName()}
            isInvited={false}
            details={getFakeDetails()}
        />);

        wrapper.find('.details-button').simulate('click');
        wrapper.find('.details-button').simulate('click');

        expect(wrapper.containsMatchingElement(
            <Glyphicon glyph="chevron-down" className="details-button" />
        )).to.be.true;
    });

    it('should not contain <DetailedDescription /> by default', () => {
        const wrapper = shallow(<Visitor
            name={getFakeName()}
            isInvited={false}
            details={getFakeDetails()}
        />);

        expect(wrapper.find(DetailedDescription)).to.have.length(0);
    });

    it('should render <DetailedDescription /> when details are shown', () => {
        const wrapper = mount(<Visitor
            name={getFakeName()}
            isInvited={false}
            details={getFakeDetails()}
        />);

        wrapper.find('.details-button').simulate('click');

        expect(wrapper.find(DetailedDescription)).to.have.length(1);
    });

    it('should remove <DetailedDescription /> when details are hidden', () => {
        const wrapper = mount(<Visitor
            name={getFakeName()}
            isInvited={false}
            details={getFakeDetails()}
        />);

        wrapper.find('.details-button').simulate('click');
        wrapper.find('.details-button').simulate('click');

        expect(wrapper.find(DetailedDescription)).to.have.length(0);
    });

    it('should pass correct props to <DetailedDescription />', () => {
        const details = getFakeDetails();

        const wrapper = mount(<Visitor
            name={getFakeName()}
            isInvited={false}
            details={details}
        />);
        wrapper.find('.details-button').simulate('click');

        expect(wrapper.find(DetailedDescription).props()).to.eql(details);
    });

    it('should be contained <InviteButton />', () => {
        const wrapper = shallow(<Visitor
            name={getFakeName()}
            isInvited={false}
            details={getFakeDetails()}
        />);

        expect(wrapper.find(InviteButton)).to.have.length(1);
    });

    it('should pass correct props to <InviteButton />', () => {
        const isInvited = faker.random.boolean();
        const wrapper = shallow(<Visitor
            name={getFakeName()}
            isInvited={isInvited}
            details={getFakeDetails()}
        />);

        expect(wrapper.find(InviteButton).prop('isInvited')).to.equal(isInvited);
    });

    it('should fire "onInvite" callback once invitation button is clicked', () => {
        const spy = sinon.spy();

        const wrapper = shallow(<Visitor
            name={getFakeName()}
            isInvited={false}
            details={getFakeDetails()}
            onInvite={spy}
        />);
        // Simulate click on invitation button.
        wrapper.find(InviteButton).prop('onClick')();

        expect(spy.calledOnce).to.be.true;
    });
});
