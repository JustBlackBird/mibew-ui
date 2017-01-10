import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import * as faker from 'faker';
import DetailedDescription from './detailed_description';

describe('<DetailedDescription />', () => {
    it('should just work', () => {
        const wrapper = shallow(<DetailedDescription
            firstTime={1487654000}
            lastTime={1487654005}
            remoteAddress={faker.internet.ip()}
            ip={faker.internet.ip()}
            invitationsCount={3}
            chatsCount={5}
        />);

        expect(wrapper).to.exist;
    });
});