import { RECEIVE_USERS, SAVE_USER_ANSWER, CREATE_USER_POLL } from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case CREATE_USER_POLL:
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: [action.question.id].concat(state[action.question.author].questions),
        },
      };
    case SAVE_USER_ANSWER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer,
          },
        },
      };
    default:
      return state;
  }
}
