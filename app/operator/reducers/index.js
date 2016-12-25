import * as actions from '../actions';

const initialState = {visitors: []};

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.UPDATE_VISITORS:
            return {visitors: action.visitors};
        default:
            return state;
    }
};