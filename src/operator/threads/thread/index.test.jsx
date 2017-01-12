import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import * as faker from 'faker';
import Thread from './index.jsx';

describe('<Thread />', () => {
    it('should display user name', () => {
        const name = faker.name.findName();

        const wrapper = shallow(<Thread userName={name} />);

        expect(wrapper.find('.user-name')).to.have.length(1);
        expect(wrapper.find('.user-name').matchesElement(
            <div>User name: {name}</div>
        )).to.be.true;
    });
});
