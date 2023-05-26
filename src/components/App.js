import { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading-bar";
import Nav from "./Nav";
import NotFound from "./NotFound";
import Dashboard from "./Dashboard";
import NewPoll from "./NewPoll";
import Login from "./Login";
import PollPage from "./PollPage";
import Leaderboard from "./Leaderboard";

function App({ isLogged, dispatch }) {
  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <LoadingBar />
        {isLogged && <Nav />}
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/add" element={<NewPoll />} />
          <Route exact path="/questions/:id" element={<PollPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  isLogged: authedUser !== null,
});

export default connect(mapStateToProps)(App);
