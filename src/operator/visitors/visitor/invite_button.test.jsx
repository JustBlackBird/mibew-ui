import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import * as sinon from 'sinon';
import InviteButton from './invite_button';

describe('<InviteButton />', () => {
    describe('inactive state (already invited visitor)', () => {
        it('should be null', () => {
            const wrapper = shallow(<InviteButton isInvited={true} />);

            expect(wrapper.html()).to.be.null;
        });
    });

    describe('active state (not invited visitor)', () => {
        it('should be a link', () => {
            const wrapper = shallow(<InviteButton isInvited={false} />);

            expect(wrapper.is('a')).to.be.true;
        });

        it('should display "invite" word', () => {
            const wrapper = shallow(<InviteButton isInvited={false} />);

            expect(wrapper.render().text()).to.have.string('invite');
        });

        it('should fire "onClick" callback', () => {
            const spy = sinon.spy();

            const wrapper = mount(<InviteButton isInvited={false} onClick={spy} />);
            wrapper.simulate('click');

            expect(spy.calledOnce).to.be.true;
        });

        it('should works even if no "onClick" callback passed in', () => {
            const wrapper = mount(<InviteButton isInvited={false} />);
            // If something goes wrong the error will be thrown here. So
            // "no errors" means everything is fine.
            wrapper.simulate('click');
        });
    });
});