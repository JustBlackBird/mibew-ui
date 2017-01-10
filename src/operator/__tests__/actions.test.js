import {expect} from 'chai';
import * as actions from '../actions';

describe('Actions', () => {
    describe('updateVisitors', () => {
        it('should set correct action type', () => {
            const action = actions.updateVisitors([]);

            expect(action.type).to.equal(actions.UPDATE_VISITORS);
        });

        it('should use passed in visitors as is', () => {
            const visitors = [{foo: 'bar', baz: 'quux'}];

            const action = actions.updateVisitors(visitors);

            expect(action.visitors).to.deep.equal(visitors);
        });
    });

    describe('inviteVisitor', () => {
        it('should set correct action type', () => {
            const action = actions.inviteVisitor('foo');

            expect(action.type).to.equal(actions.INVITE_VISITOR);
        });

        it('should use visitor ID as is', () => {
            const id = 'foo';

            const action = actions.inviteVisitor(id);

            expect(action.visitorId).to.equal(id);
        });
    });
});
