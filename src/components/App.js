import { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading-bar';
import Nav from './Nav';
import NotFound from './NotFound';
import Dashboard from './Dashboard';
import Login from './Login';

function App(props) {
  let navigate = useNavigate();

  useEffect(() => {
    if (props.isLogged) navigate('/login');
    props.dispatch(handleInitialData());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isLogged]);

  return (
    <Fragment>
      <LoadingBar />
      <div className='container'>
        <Nav />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </Fragment>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  isLogged: authedUser === null,
});

export default connect(mapStateToProps)(App);
