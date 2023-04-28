import { connect } from 'react-redux';
import Question from './Question';

const Dashboard = (props) => {
  return (
    <div>
      <ul className='dashboard-list'>
        {props.questionIds.map((id) => (
          <li key={id}>
            <Question id={id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.info('*** Dashboard state ***', state);
  return {
    questionIds: Object.keys(state.questions).sort(
      (a, b) => state.questions[b].timestamp - state.questions[a].timestamp
    ),
  };
};

export default connect(mapStateToProps)(Dashboard);
