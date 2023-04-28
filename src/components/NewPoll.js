import { useState } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';
import { useNavigate } from 'react-router-dom';

const NewPoll = ({ dispatch }) => {
  const navigate = useNavigate();

  const [question, setQuestion] = useState({
    optionOneText: '',
    optionTwoText: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setQuestion({ ...question, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion(question));

    navigate('/');
  };

  return (
    <div className='new-question'>
      <h2 className='center'>Would You Rather</h2>
      <h4 className='center'>Create Your Own Poll</h4>
      <form className='new-question' onSubmit={handleSubmit}>
        <div className='center'>
          <label>First Option</label>
          <input
            name='optionOneText'
            type='text'
            placeholder='Option One'
            onChange={handleChange}
            required
          />
        </div>
        <div className='center'>
          <label>Second Option</label>
          <input
            name='optionTwoText'
            type='text'
            placeholder='Option Two'
            onChange={handleChange}
            required
          />
        </div>
        <button
          className='btn'
          type='submit'
          onClick={handleSubmit}
          disabled={question.optionOneText === '' && question.optionTwoText === ''}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default connect()(NewPoll)