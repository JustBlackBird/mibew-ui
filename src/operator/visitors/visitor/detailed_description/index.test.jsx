import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import * as faker from 'faker';
import * as sinon from 'sinon';
import DetailedDescription from './index.jsx';

const getFakeDetails = () => {
    return {
        firstTime: 1487654000,
        lastTime: 1487654050,
        remoteAddress: faker.internet.ip(),
        ip: faker.internet.ip(),
        invitationsCount: faker.random.number(0, 10),
        chatsCount: faker.random.number(0, 10),
        userAgent: faker.internet.userAgent(),
        invitedBy: faker.name.findName(),
        invitationTime: 1487654030
    };
};

describe('<DetailedDescription />', () => {
    it('should display first visit time', () => {
        const details = getFakeDetails();
        const formatter = sinon.stub();
        formatter.returns('foo');

        const wrapper = shallow(<DetailedDescription
            {...details}
            timeFormatter={formatter}
        />);

        expect(wrapper.find('.first-time')).to.have.length(1);
        expect(wrapper.find('.first-time').text()).to.have.string('First seen: foo');
        expect(formatter.calledWithExactly(details.firstTime)).to.be.true;
    });

    it('should display last visit time', () => {
        const details = getFakeDetails();
        const formatter = sinon.stub();
        formatter.returns('bar');

        const wrapper = shallow(<DetailedDescription
            {...details}
            timeFormatter={formatter}
        />);

        expect(wrapper.find('.last-time')).to.have.length(1);
        expect(wrapper.find('.last-time').text()).to.have.string('Last seen: bar');
        expect(formatter.calledWithExactly(details.lastTime)).to.be.true;
    });

    it('should display remote address', () => {
        const details = getFakeDetails();

        const wrapper = shallow(<DetailedDescription {...details} />);

        expect(wrapper.find('.remote-address')).to.have.length(1);
        expect(wrapper.find('.remote-address').text())
            .to.equal('Address: ' + details.remoteAddress);
    });

    it('should display user agent', () => {
        const details = getFakeDetails();

        const wrapper = shallow(<DetailedDescription {...details} />);

        expect(wrapper.find('.user-agent')).to.have.length(1);
        expect(wrapper.find('.user-agent').text())
            .to.equal('User agent: ' + details.userAgent);
    });

    it('should use efault value if "userAgent" prop is omitted', () => {
        let details = getFakeDetails();
        delete details.userAgent;

        const wrapper = shallow(<DetailedDescription {...details} />);

        expect(wrapper.find('.user-agent')).to.have.length(1);
        expect(wrapper.find('.user-agent').text())
            .to.equal('User agent: Unknown');
    });

    it('should display name of operator who invite the visitor', () => {
        const details = getFakeDetails();

        const wrapper = shallow(<DetailedDescription {...details} />);

        expect(wrapper.find('.invited-by')).to.have.length(1);
        expect(wrapper.find('.invited-by').text())
            .to.equal('Invited by: ' + details.invitedBy);
    });

    it('should use default value if "invitedBy" prop is omitted', () => {
        let details = getFakeDetails();
        delete details.invitedBy;

        const wrapper = shallow(<DetailedDescription {...details} />);

        expect(wrapper.find('.invited-by')).to.have.length(1);
        expect(wrapper.find('.invited-by').text()).to.equal('Invited by: -');
    });

    it('should display invitation time', () => {
        const details = getFakeDetails();
        const formatter = sinon.stub();
        formatter.returns('baz');

        const wrapper = shallow(<DetailedDescription
            {...details}
            timeFormatter={formatter}
        />);

        expect(wrapper.find('.invitation-time')).to.have.length(1);
        expect(wrapper.find('.invitation-time').text())
            .to.have.string('Invitation time: baz');
        expect(formatter.calledWithExactly(details.invitationTime)).to.be.true;
    });

    it('should use default value if "invitationTime" prop is omitted', () => {
        let details = getFakeDetails();
        delete details.invitationTime;

        const wrapper = shallow(<DetailedDescription {...details} />);

        expect(wrapper.find('.invitation-time')).to.have.length(1);
        expect(wrapper.find('.invitation-time').text())
            .to.have.string('Invitation time: -');        
    });

    it('should display invitations count', () => {
        const details = getFakeDetails();

        const wrapper = shallow(<DetailedDescription {...details} />);

        expect(wrapper.find('.invitations-count')).to.have.length(1);
        expect(wrapper.find('.invitations-count').text())
            .to.equal('Invitations: ' + details.invitationsCount.toString());
    });

    it('should display chats count', () => {
        const details = getFakeDetails();

        const wrapper = shallow(<DetailedDescription {...details} />);

        expect(wrapper.find('.chats-count')).to.have.length(1);
        expect(wrapper.find('.chats-count').text())
            .to.equal('Chats: ' + details.chatsCount.toString());
    });
});
