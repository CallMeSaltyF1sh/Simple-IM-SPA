import * as actionTypes from './constants';

export const changeRegisterModalDisplay = data => dispatch => {dispatch({
    type: actionTypes.CHANGE_REGISTER_MODAL_DISPLAY,
    data
})};