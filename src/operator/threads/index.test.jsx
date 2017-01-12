import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import * as faker from 'faker';
import Threads from './index';
import Thread from './thread';

const getFakeThread = () => {
    return {
        id: faker.random.number(100, 100000),
        userName: faker.name.findName()
    };
};

describe('<Threads />', () => {
    it('should render correct threads count', () => {
        const threads = [
            getFakeThread(),
            getFakeThread()
        ];

        const wrapper = shallow(<Threads threads={threads} />);

        expect(wrapper.find(Thread)).to.have.length(2);
    });

    it('should pass all the necessary props to <Thread />', () => {
        const thread = getFakeThread();

        const wrapper = shallow(<Threads threads={[thread]} />);

        expect(wrapper.find(Thread).prop('name')).to.equal(thread.name);
    });

    it('should keep correct <Thread /> order', () => {
        const threads = [
            getFakeThread(),
            getFakeThread()
        ];

        const wrapper = shallow(<Threads threads={threads} />);

        expect(wrapper.find(Thread).at(0).prop('name')).to.equal(threads[0].name);
        expect(wrapper.find(Thread).at(1).prop('name')).to.equal(threads[1].name);
    });
});
