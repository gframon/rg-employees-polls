import { getUserLogout } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const LOGOUT = 'LOGOUT';

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

export function logout() {
  return {
    type: LOGOUT,
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
