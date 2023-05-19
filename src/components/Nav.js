import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { handleLogout } from "../actions/authedUser";

const pages = [
  { text: "Home", to: "/" },
  { text: "Leaderboard", to: "/leaderboard" },
  { text: "New", to: "/add" },
];

const Nav = ({ isLogged, authedUser, userAvatar, dispatch }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    const { name } = e.target;
    navigate(name);
  };

  const userLogout = (e) => {
    e.preventDefault();
    dispatch(handleLogout(authedUser));
    navigate("/login");
  };

  return (
    <>
      {isLogged && (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page.text}
                    name={page.to}
                    onClick={handleClick}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.text}
                  </Button>
                ))}
              </Box>
              <Tooltip title={authedUser}>
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt={userAvatar} src={userAvatar} />
                </IconButton>
              </Tooltip>

              <Button color="inherit" onClick={userLogout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { users, authedUser } = state;
  const userAvatar = authedUser ? users[authedUser].avatarURL : "";
  return {
    isLogged: authedUser !== null,
    authedUser,
    userAvatar,
  };
};

export default connect(mapStateToProps)(Nav);
