import { _getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer } from './_DATA';

export const getInitialData = async () => {
  const [users, questions] = await Promise.all([_getUsers(), _getQuestions()]);
  return {
    users,
    questions,
  };
};

export const saveQuestion = (info) => {
  return _saveQuestion(info);
};

export const saveQuestionAnswer = (info) => {
  return _saveQuestionAnswer(info);
};

