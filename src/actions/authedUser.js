import { getUserLogin } from '../utils/api';

export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

export function handleLogin(username, password) {
  return (dispatch) => {
    return getUserLogin(username, password).then(({ user }) => {
      dispatch(setAuthedUser(user.id));
    });
  };
}
