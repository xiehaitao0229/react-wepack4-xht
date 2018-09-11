import userInfo from 'reducers/userInfo';
import couter from './reducers/couters';

export default function combineReducers(state = {}, action) {
  return {
    couter: couter(state.couter, action),
    userInfo: userInfo(state.userInfo, action),
  };
}
