import { showLoading, hideLoading } from "react-redux-loading-bar";

export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const LOGOUT = "LOGOUT";

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

export function handleLogout() {
  return (dispatch) => {
    dispatch(showLoading());
    dispatch(logout());
    return dispatch(hideLoading());
  };
}
