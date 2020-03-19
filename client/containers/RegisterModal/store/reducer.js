import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    display: false
});

export default (state = defaultState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_REGISTER_MODAL_DISPLAY:
            return state.set('display', action.data);
        default:
            return state;
    }
};
