import { _saveQuestion, _saveQuestionAnswer } from "./_DATA";

describe("_saveQuestion", () => {
  it("will validate _saveQuestion behavior", async () => {
    const question = {
      author: "sarahedo",
      optionOneText: "Fist option.",
      optionTwoText: "Second option.",
    };
    await expect(_saveQuestion(question)).resolves.toMatchObject({
      author: "sarahedo",
      optionOne: {
        text: "Fist option.",
      },
      optionTwo: {
        text: "Second option.",
      },
    });
  });

  it("will fail with incorrect data", async () => {
    await expect(_saveQuestion({ author: "sarahedo" })).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("will validate _saveQuestionAnswer behavior", async () => {
    const response = {
      authedUser: "sarahedo",
      qid: "6ni6ok3ym7mf1p33lnez",
      answer: "optionOne",
    };
    await expect(_saveQuestionAnswer(response)).resolves.toBe(true);
  });

  it("will fail with incorrect data", async () => {
    await expect(_saveQuestionAnswer({ authedUser: "sarahedo" })).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});
