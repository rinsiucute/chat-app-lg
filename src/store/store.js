import { createStore , applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer  from './reducer/index.js';

const initalState = {};
const middleware = [thunk];

const store = createStore(rootReducer,initalState,composeWithDevTools(applyMiddleware(...middleware)));
// để không hiện ra ta dùng  const store = createStore(rootReducer,initalState,applyMiddleware(...middleware));
export default store
