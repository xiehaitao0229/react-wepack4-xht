import { combineReducers } from 'redux';
import userInfo from 'reducers/userInfo';
import couter from './reducers/couters';

export default combineReducers({
  couter,
  userInfo,
});
