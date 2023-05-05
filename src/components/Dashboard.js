import { connect } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Divider } from '@mui/material';
import Question from './Question';

const Dashboard = (props) => {
  console.info('** dashboard props **', props);
  return (
    <>
      <CssBaseline />
      <Container maxWidth='xl'>
        <Box>
          <ul>
            {Object.keys(props.sections).map((key, idx) => (
              <Box
                key={idx}
                style={{
                  border: 'solid 1px #ACACAC',
                  borderRadius: '5px',
                  marginTop: '20px',
                }}
              >
                <h2 className='center'>
                  {key.startsWith('new') ? 'New Questions' : 'Done'}
                </h2>
                <Divider />
                <Box
                  display='flex'
                  flexDirection='row'
                  sx={{ flexWrap: 'wrap', alignContent: 'space-between', margin: '10px' }}
                >
                  {props.sections[key].map((id) => (
                    <Question key={id} id={id} />
                  ))}
                </Box>
              </Box>
            ))}
          </ul>
        </Box>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  const { questions, authedUser } = state;
  let dashboard = { newQuestions: [], doneQuestions: [] };
  // console.info('*** Dashboard state ***', state);
  Object.values(questions).map(({ id, optionOne, optionTwo }) => {
    return optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser)
      ? dashboard.doneQuestions.push(id)
      : dashboard.newQuestions.push(id);
  });
  return {
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
    sections: { ...dashboard },
  };
};

export default connect(mapStateToProps)(Dashboard);
