import {expect} from 'chai';
import {updateVisitors} from '../actions';
import reducers from './';

describe('Reducers', () => {
    describe('UPDATE_VISITORS', () => {
        it('should replace visitors with set from action', () => {
            const visitors = [{foo: 'bar', baz: 'quux'}];
            const initialState = {visitors};

            const newState = reducers(initialState, updateVisitors(visitors));

            // The state is just visitors list.
            expect(newState.visitors).to.eql(visitors);
        });
    });
});