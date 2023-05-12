import { useState } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const NewPoll = ({ dispatch, authedUser }) => {
  const navigate = useNavigate();

  const [poll, setPoll] = useState({
    optionOneText: "",
    optionTwoText: "",
    author: authedUser,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPoll({ ...poll, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion(poll));

    navigate("/");
  };

  return (
    <div className="new-question">
      <Box component="div">
        <h2 className="center">Would You Rather</h2>
        <h5 className="center">Create Your Own Poll</h5>
      </Box>

      <form className="new-question" onSubmit={handleSubmit}>
        <div className="center">
          <label>First Option</label>
          <input
            name="optionOneText"
            type="text"
            placeholder="Option One"
            onChange={handleChange}
            required
          />
        </div>
        <div className="center">
          <label>Second Option</label>
          <input
            name="optionTwoText"
            type="text"
            placeholder="Option Two"
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="btn"
          type="submit"
          onClick={handleSubmit}
          disabled={poll.optionOneText === "" && poll.optionTwoText === ""}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { authedUser } = state;
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(NewPoll);
