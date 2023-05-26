import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { withRouter } from "../utils/helpers";
import { CssBaseline, Box, Container, Avatar, Button, Typography } from "@mui/material";
import { handleSaveAnswer } from "../actions/shared";
import PollStats from "./PollStats";
import NotFound from "./NotFound";

const Poll = ({ qid, users, questions, authedUser, dispatch }) => {
  const navigate = useNavigate();
  const [optionOnePercent, setOptionOnePercent] = useState(0);
  const [optionTwoPercent, setOptionTwoPercent] = useState(0);

  const handleClick = (answer) => {
    dispatch(handleSaveAnswer(authedUser, questions[qid], answer));
  };

  useEffect(() => {
    if (authedUser === null) {
      navigate("/login");
    }
  }, [authedUser, navigate]);

  useEffect(() => {
    if (questions[qid]) {
      const question = questions[qid];
      const { optionOne, optionTwo } = question;
      const votes = optionOne.votes.length + optionTwo.votes.length;
      setOptionOnePercent((optionOne.votes.length / votes) * 100);
      setOptionTwoPercent((optionTwo.votes.length / votes) * 100);
    }
  }, [qid, questions]);

  if (!questions[qid]) return <NotFound />;

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            <h3 className="center">Poll by {questions[qid].author}</h3>
            <Avatar
              alt={questions[qid].author}
              src={users[questions[qid].author].avatarURL}
              sx={{ width: 250, height: 250, margin: "auto" }}
            />
            <h3 className="center">Would You Rather</h3>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            borderRadius: 1,
          }}
        >
          <Box sx={{ width: 450 }}>
            <Box
              sx={{
                p: 1,
                border: "solid 1px #ACACAC",
                borderRadius: 1,
                textAlign: "center",
              }}
            >
              <Typography variant="caption" display="block">
                {questions[qid].optionOne.text}
              </Typography>
            </Box>
            <Box>
              {questions[qid].optionOne.votes.includes(authedUser) ||
              questions[qid].optionTwo.votes.includes(authedUser) ? (
                <PollStats
                  votes={questions[qid].optionOne.votes.length}
                  percentage={optionOnePercent}
                  userSelection={questions[qid].optionOne.votes.includes(authedUser)}
                />
              ) : (
                <Button
                  variant="contained"
                  sx={{ width: "100%" }}
                  onClick={() => handleClick("optionOne")}
                >
                  Click
                </Button>
              )}
            </Box>
          </Box>
          <Box sx={{ width: 450 }}>
            <Box
              sx={{
                p: 1,
                border: "solid 1px #ACACAC",
                borderRadius: 1,
                textAlign: "center",
              }}
            >
              <Typography variant="caption" display="block">
                {questions[qid].optionTwo.text}
              </Typography>
            </Box>
            <Box>
              {questions[qid].optionOne.votes.includes(authedUser) ||
              questions[qid].optionTwo.votes.includes(authedUser) ? (
                <PollStats
                  votes={questions[qid].optionTwo.votes.length}
                  percentage={optionTwoPercent}
                  userSelection={questions[qid].optionTwo.votes.includes(authedUser)}
                />
              ) : (
                <Button
                  variant="contained"
                  sx={{ width: "100%" }}
                  onClick={() => handleClick("optionTwo")}
                >
                  Click
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

const mapStateToProps = ({ authedUser, questions, users }, props) => {
  const { id } = props.router.params;
  return {
    qid: id,
    users,
    questions,
    authedUser,
  };
};
export default withRouter(connect(mapStateToProps)(Poll));
