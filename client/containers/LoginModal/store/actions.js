import * as actionTypes from './constants';

export const changeLoginModalDisplay = data => dispatch => {dispatch({
    type: actionTypes.CHANGE_LOGIN_MODAL_DISPLAY,
    data
})};