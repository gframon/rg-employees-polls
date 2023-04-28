import { getUserLogin, getUserLogout } from '../utils/api';
import { setAuthedUser } from './authedUser';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const LOGOUT = 'LOGOUT';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function handleLogin(username, password) {
  return (dispatch) => {
    dispatch(showLoading());
    return getUserLogin(username, password).then(({ user }) => {
      dispatch(setAuthedUser(user.id));
      dispatch(hideLoading());
    });
  };
}

export function handleLogout(uid) {
  return (dispatch) => {
    dispatch(showLoading());
    return getUserLogout(uid).then(() => {
      dispatch(logout());
      dispatch(hideLoading());
    });
  };
}
