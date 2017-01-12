import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import * as faker from 'faker';
import * as sinon from 'sinon';
import Application from './application';
import Visitors from './visitors';

const getFakeVisitor = () => {
    return {
        id: faker.random.number(1000, 100000)
    };
};

describe('<Application />', () => {
    it('should render visitors', () => {
        const spy = sinon.spy();
        const visitors = [
            getFakeVisitor(),
            getFakeVisitor()
        ];

        const wrapper = shallow(<Application visitors={visitors} dispatch={spy} />);

        expect(wrapper.find(Visitors)).to.have.length(1);
        expect(wrapper.find(Visitors).prop('visitors')).to.eql(visitors);
        expect(wrapper.find(Visitors).prop('dispatch')).to.equal(spy);
    });
});

