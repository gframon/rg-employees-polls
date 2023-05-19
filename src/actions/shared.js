import { getInitialData, saveQuestionAnswer, saveQuestion } from "../utils/api";
import { receiveQuestions, savePollAnswer, addQuestion } from "./questions";
import { receiveUsers, createUserPoll, saveUserAnswer } from "./users";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading);
    return getInitialData().then(({ questions, users }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading);
    });
  };
}

export function handleAddQuestion(data) {
  return (dispatch) => {
    dispatch(showLoading());

    return saveQuestion(data)
      .then((question) => {
        dispatch(addQuestion(question));
        dispatch(createUserPoll(question));
      })
      .finally(() => dispatch(hideLoading()));
  };
}

export function handleSaveAnswer(authedUser, qid, answer) {
  return (dispatch) => {
    dispatch(showLoading());
    return saveQuestionAnswer({
      authedUser,
      qid,
      answer,
    })
      .then(() => {
        dispatch(savePollAnswer(authedUser, qid, answer));
        dispatch(saveUserAnswer(authedUser, qid, answer));
      })
      .catch((error) => alert(`${error}`))
      .finally(() => dispatch(hideLoading()));
  };
}
