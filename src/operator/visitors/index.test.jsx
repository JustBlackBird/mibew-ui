import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import * as faker from 'faker';
import * as sinon from 'sinon';
import Visitors from './index.jsx';
import Visitor from './visitor';

const getFakeVisitor = () => {
    return {
        id: faker.random.number(1000, 9999) + '.' + faker.random.number(10, 99),
        name: faker.name.findName(),
        isInvited: faker.random.boolean(),
        // No need for details here 'cause we don't plan to render all the child
        // components of the visitor.
        details: {}
    };
};

describe('<Visitors />', () => {
    it('should render correct number of <Visitor />', () => {
        const visitors = [
            getFakeVisitor(),
            getFakeVisitor()
        ];

        const wrapper = shallow(<Visitors
            visitors={visitors}
            onInvite={sinon.spy()}
        />);

        expect(wrapper.find(Visitor)).to.have.length(2);
    });

    it('should pass all the necessary props to <Visitor />', () => {
        const visitor = getFakeVisitor();

        const wrapper = shallow(<Visitors
            visitors={[visitor]}
            onInvite={sinon.spy()}
        />);

        expect(wrapper.find(Visitor).prop('name')).to.equal(visitor.name);
        expect(wrapper.find(Visitor).prop('isInvited')).to.equal(visitor.isInvited);
        expect(wrapper.find(Visitor).prop('details')).to.equal(visitor.details);
    });

    it('should use correct order for <Visitor />', () => {
        const visitors = [
            getFakeVisitor(),
            getFakeVisitor()
        ];

        const wrapper = shallow(<Visitors
            visitors={visitors}
            onInvite={sinon.spy()}
        />);

        expect(wrapper.find(Visitor).at(0).prop('name')).to.equal(visitors[0].name);
        expect(wrapper.find(Visitor).at(1).prop('name')).to.equal(visitors[1].name);
    });

    it('should fire "onInvite" callback', () => {
        const spy = sinon.spy();
        const visitor = getFakeVisitor();

        const wrapper = shallow(<Visitors
            visitors={[visitor]}
            onInvite={spy}
        />);
        // Emulate vistor's invitation
        wrapper.find(Visitor).prop('onInvite')();

        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWithExactly(visitor.id));
    });
});
