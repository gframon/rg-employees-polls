import { combineReducers } from 'redux';
import questions from './questions';
import authedUser from './authedUser';
import users from './users';
import { loadingBarReducer } from 'react-redux-loading-bar';

export default combineReducers({
  questions,
  authedUser,
  users,
  loadingBar: loadingBarReducer,
});
