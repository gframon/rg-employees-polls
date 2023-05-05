import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleLogout } from '../actions/authedUser';

const Nav = (props) => {
  const userLogout = (e) => {
    e.preventDefault();
    console.info('It could be done this way!');
    props.dispatch(handleLogout(props.authedUser));
  };
  return (
    <>
      {props.isLogged && (
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
              <Link to='/profile'>{props.authedUser}</Link>
            </li>
            <li>
              <Link to='/login' onClick={userLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  console.info('*** Nav State ***', state);
  return { isLogged: state.authedUser !== null, authedUser: state.authedUser };
};

export default connect(mapStateToProps)(Nav);
