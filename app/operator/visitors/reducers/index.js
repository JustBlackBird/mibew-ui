import * as actions from '../actions';

export default function (state = [], action) {
    switch (action.type) {
        case actions.UPDATE_VISITORS:
            return action.visitors;
        default:
            return state;
    }
};
