import { combineReducers } from 'redux-immutable';
import { reducer as loginModalReducer } from '@/containers/LoginModal/store/index';
import { reducer as registerModalReducer } from '@/containers/RegisterModal/store/index';
import { reducer as mainPanelReducer } from '@/containers/MainPanel/store/index';
import { reducer as listPanelReducer } from '@/containers/ListPanel/store/index';
import { reducer as cgModalReducer } from '@/containers/CreateGroupModal/store/index';

export default combineReducers({
    loginModal: loginModalReducer,
    registerModal: registerModalReducer,
    mainPanel: mainPanelReducer,
    listPanel: listPanelReducer,
    createGroupModal: cgModalReducer,
});
