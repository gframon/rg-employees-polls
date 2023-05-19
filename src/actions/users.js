import { getUserLogin } from "../utils/api";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const SAVE_USER_ANSWER = "SAVE_USER_ANSWER";
export const CREATE_USER_POLL = "CREATE_USER_POLL";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function saveUserAnswer(authedUser, qid, answer) {
  return {
    type: SAVE_USER_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

export function createUserPoll(question) {
  return {
    type: CREATE_USER_POLL,
    question,
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
