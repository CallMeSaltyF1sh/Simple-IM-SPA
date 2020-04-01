import * as actionTypes from './constants';

export const changeCGModalDisplay = data => dispatch => {dispatch({
    type: actionTypes.CHANGE_CG_MODAL_DISPLAY,
    data
})};