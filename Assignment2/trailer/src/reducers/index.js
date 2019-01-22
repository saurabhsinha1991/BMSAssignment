import { combineReducers } from 'redux';
import postReducer from './postReducer';

const rootReducer = combineReducers({
    list: postReducer
});

export default rootReducer;