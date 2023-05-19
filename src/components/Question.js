import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

const Question = (props) => {
  const navigate = useNavigate();

  const toPoll = (e) => {
    e.preventDefault();
    navigate(`/questions/${props.question.id}`);
  };

  if (props.question === null) {
    return <p>This Poll doesn't exist</p>;
  }
  const { timestamp, author } = props.question;
  return (
    <div className="poll" style={{ marginTop: "5px" }}>
      <div className="poll-info">
        <span>{author}</span>
        <div>{formatDate(timestamp)}</div>
        <br />
        <button className="btn" onClick={toPoll}>
          Show
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser }, { id }) => {
  const question = questions[id];
  return {
    authedUser,
    question: question ? question : null,
  };
};

export default connect(mapStateToProps)(Question);
