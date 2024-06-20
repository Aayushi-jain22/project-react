import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; 
import authReducer from './reducers/AuthReducer';
import taskReducer from './reducers/TaskReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    tasks: taskReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;