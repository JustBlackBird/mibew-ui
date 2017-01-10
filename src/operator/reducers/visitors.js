import {UPDATE_VISITORS} from '../actions';

export default function (state = [], action) {
    switch (action.type) {
        case UPDATE_VISITORS:
            return action.visitors;
        default:
            return state;
    }
};
