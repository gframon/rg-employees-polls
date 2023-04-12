import { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading-bar';
import Nav from './Nav';
import Login from './Login';
import { Route, Routes } from 'react-router-dom';

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, [props]);

  return (
    <Fragment>
      <LoadingBar />
      <div className='container'>
        <Nav />
        {/* TODO: Add condition of loading */}
        <Routes>
          <Route exact path='/' element={<Login />} />
        </Routes>
      </div>
    </Fragment>
  );
}

export default connect()(App);
