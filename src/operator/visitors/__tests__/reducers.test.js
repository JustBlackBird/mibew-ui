import {expect} from 'chai';
import {updateVisitors} from '../actions';
import reduceState from '../reducers';

describe('Visitors Reducers', () => {
    describe('UPDATE_VISITORS', () => {
        it('should replace visitors with set from action', () => {
            const visitors = [{foo: 'bar', baz: 'quux'}];
            const initialState = [];

            const newState = reduceState(initialState, updateVisitors(visitors));

            // The state is just visitors list.
            expect(newState).to.deep.equal(visitors);
        });
    });
});