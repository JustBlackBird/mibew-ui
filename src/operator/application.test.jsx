import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import * as faker from 'faker';
import * as sinon from 'sinon';
import Application from './application';
import Visitors from './visitors';
import * as actions from './actions';

const getFakeVisitor = () => {
    return {
        id: faker.random.number(1000, 100000).toString()
    };
};

describe('<Application />', () => {
    it('should render <Visitors />', () => {
        const visitors = [
            getFakeVisitor(),
            getFakeVisitor()
        ];

        const wrapper = shallow(<Application
            visitors={visitors}
            dispatch={sinon.spy()}
        />);

        expect(wrapper.find(Visitors)).to.have.length(1);
        expect(wrapper.find(Visitors).prop('visitors')).to.eql(visitors);
    });

    it('should dispatch INVITE_VISITOR action', () => {
        const spy = sinon.spy();
        const visitorId = 'foo.bar.baz';

        const wrapper = shallow(<Application
            visitors={[getFakeVisitor()]}
            dispatch={spy}
        />);
        // Emulate vistor's invitation
        wrapper.find(Visitors).prop('onInvite')(visitorId);

        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args).to.have.length(1);
        const event = spy.firstCall.args[0];
        expect(event.type).to.equal(actions.INVITE_VISITOR);
        expect(event.visitorId).to.equal(visitorId);
    });
});

