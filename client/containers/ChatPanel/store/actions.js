import * as actionTypes from './constants';
import { fromJS } from 'immutable';

export const changeLinkmanList = data => ({
    type: actionTypes.CHANGE_MSG_LIST,
    data: fromJS(data)
});