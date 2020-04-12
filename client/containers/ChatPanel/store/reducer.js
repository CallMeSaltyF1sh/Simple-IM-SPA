import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    list: [],
    targetInfo: {}
});

export default (state = defaultState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_MSG_LIST:
            return state.set('list', action.data);
        case actionTypes.SET_TARGET_INFO:
            return state.set('targetInfo', action.data);
        case actionTypes.ADD_MSG_ITEM: {
            const targetId = state.getIn(['targetInfo', 'id'])
            console.log(targetId);
            if(action.id === targetId) {
                return state.update('list', list => (
                    list.push(action.msg)
                ))
            } else {
                return state
            }
        }
        default:
            return state;
    }
};
