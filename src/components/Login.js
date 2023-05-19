import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleLogin } from '../actions/users';
import logo from '../assets/logo-img.jpeg';

function Login({ dispatch, authedUser }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleLogin(user.id, user.password));

    setUser({ id: '', password: '' });
    navigate("/");
  };

  return (
    <div className='login-info'>
      <h1 className='center'>Employee Polls</h1>
      <div className='imgcontainer'>
        <img src={logo} alt='Login Avatar' className='avatar' />
      </div>
      <h1 className='center'>Log In</h1>
      {/** TODO: add image */}
      <form className='login-info'>
        <div className='center'>
          <label htmlFor='id'>User</label>
          <input
            name='id'
            type='text'
            placeholder='User'
            onChange={handleChange}
            required
          />
        </div>
        <div className='center'>
          <label>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            onChange={handleChange}
            required
          />
        </div>
        <button
          className='btn'
          type='submit'
          onClick={handleSubmit}
          disabled={user.id === ''}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { authedUser: state.authedUser }
}

export default connect(mapStateToProps)(Login);
