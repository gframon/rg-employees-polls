import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = ({ isLogged }) => {
  console.info('===> ', isLogged);
  return (
    <nav className='nav'>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/leaderboard'>Leaderboard</Link>
        </li>
        <li>
          <Link to='/add'>New</Link>
        </li>
        <li style={{ marginLeft: '80%' }}>
          {/** TODO: add avatar an username */}
          <Link to='/profile'>user</Link>
        </li>
        <li>
          <Link to='/login'>{isLogged ? 'Login' : 'Logout'}</Link>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => {
  console.info('*** Nav State ***', state);
  return { isLogged: state.authedUser === null };
};

export default connect(mapStateToProps)(Nav);
