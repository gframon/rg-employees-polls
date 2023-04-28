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

export const getUserLogin = async (uid, upass) => {
  const users = await _getUsers();

  return new Promise((resolve, reject) => {
    if (!uid || !upass) {
      reject('Please provide user and password');
    }
    if (users[uid] && users[uid].password !== upass) {
      reject('Incorrect password.  Try again.');
    }

    setTimeout(() => resolve({ user: users[uid] }), 1000);
  });
};

export const getUserLogout = async (uid) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`User ${uid} was logout.`), 1000);
  });
};
