import { combineReducers } from 'redux';
import * as userDataManagement from './UserDataManager' 

export default combineReducers(Object.assign(
    userDataManagement,
));
