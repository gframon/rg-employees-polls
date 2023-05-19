import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { withRouter } from "../utils/helpers";
import { CssBaseline, Box, Container, Avatar, Button, Typography } from "@mui/material";
import { handleSaveAnswer } from "../actions/shared";

const Poll = ({ authedUser, question, userAvatar, dispatch }) => {
  const navigate = useNavigate();

  const handleClick = (answer) => {
    dispatch(handleSaveAnswer(authedUser, question.id, answer));
    navigate("/leaderboard");
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
        {/* TODO: add the stadistics and color related to authedUser  */}
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
              <Button
                variant="contained"
                sx={{ width: "100%" }}
                onClick={() => handleClick("optionOne")}
              >
                Click
              </Button>
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
              <Button
                variant="contained"
                sx={{ width: "100%" }}
                onClick={() => handleClick("optionTwo")}
              >
                Click
              </Button>
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
  const userAvatar = question ? users[question.author].avatarURL : "";
  return {
    authedUser,
    question,
    userAvatar,
  };
};
export default withRouter(connect(mapStateToProps)(Poll));
