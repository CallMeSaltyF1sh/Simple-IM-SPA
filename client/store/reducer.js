import { combineReducers } from 'redux-immutable';
import { reducer as loginModalReducer } from '@/containers/LoginModal/store/index';
import { reducer as registerModalReducer } from '@/containers/RegisterModal/store/index';
import { reducer as mainPanalReducer } from '@/containers/MainPanal/store/index';
import { reducer as listPanalReducer } from '@/containers/ListPanal/store/index';
import { reducer as chatPanalReducer } from '@/containers/ChatPanel/store/index';

export default combineReducers({
    loginModal: loginModalReducer,
    registerModal: registerModalReducer,
    mainPanal: mainPanalReducer,
    listPanal: listPanalReducer,
    chatPanal: chatPanalReducer
});
