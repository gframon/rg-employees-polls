import { connect } from "react-redux";
import { withRouter } from "../utils/helpers";
import { CssBaseline, Box, Container, Avatar, Button, Typography } from "@mui/material";
import { handleSaveAnswer } from "../actions/shared";
import PollStats from "./PollStats";

const Poll = ({
  authedUser,
  question,
  userAvatar,
  answered,
  optionOnePercent,
  optionTwoPercent,
  dispatch,
}) => {
  const handleClick = (answer) => {
    dispatch(handleSaveAnswer(authedUser, question.id, answer));
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            <h3 className="center">Poll by {question.author}</h3>
            <Avatar
              alt={question.author}
              src={userAvatar}
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
                {question.optionOne.text}
              </Typography>
            </Box>
            <Box>
              {answered ? (
                <PollStats
                  votes={question.optionOne.votes.length}
                  percentage={optionOnePercent}
                  userSelection={question.optionOne.votes.includes(authedUser)}
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
                {question.optionTwo.text}
              </Typography>
            </Box>
            <Box>
              {answered ? (
                <PollStats
                  votes={question.optionTwo.votes.length}
                  percentage={optionTwoPercent}
                  userSelection={question.optionTwo.votes.includes(authedUser)}
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
  const question = questions[id];
  const { optionOne, optionTwo } = question;
  const answered =
    optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser);
  const userAvatar = users[question.author].avatarURL;
  const votes = optionOne.votes.length + optionTwo.votes.length;
  const optionOnePercent = (optionOne.votes.length / votes) * 100;
  const optionTwoPercent = (optionTwo.votes.length / votes) * 100;
  return {
    authedUser,
    question,
    userAvatar,
    answered,
    optionOnePercent,
    optionTwoPercent,
  };
};
export default withRouter(connect(mapStateToProps)(Poll));
