import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk];
if (process.env.NODE_ENV !== 'production') {
	middlewares.push(createLogger());
}

const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
