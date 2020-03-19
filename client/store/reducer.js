import { combineReducers } from 'redux-immutable';
import { reducer as loginModalReducer } from '@/containers/LoginModal/store/index';
import { reducer as registerModalReducer } from '@/containers/RegisterModal/store/index';

export default combineReducers({
    loginModal: loginModalReducer,
    registerModal: registerModalReducer
});
