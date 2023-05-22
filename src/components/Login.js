import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../actions/users";
import logo from "../assets/logo-img.jpeg";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button"

function Login({ users, dispatch }) {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setUser(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user !== "") {
      dispatch(handleLogin(user));
      setUser("");
      navigate("/");
    }
  };

  return (
    <div className="login-info">
      <h1 className="center">Employee Polls</h1>
      <div className="imgcontainer">
        <img src={logo} alt="Login Avatar" className="avatar" />
      </div>
      <h1 className="center">Log In</h1>
      <FormControl sx={{ m: 1, width: 320, margin: "auto" }} onSubmit={handleSubmit}>
        <InputLabel id="username">Users</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={user}
          label="username"
          onChange={handleChange}
        >
          {users.map((uid) => (
            <MenuItem key={uid} value={uid}>
              {uid}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" onClick={handleSubmit}>Ok</Button>
      </FormControl>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { users: Object.keys(state.users) };
};

export default connect(mapStateToProps)(Login);
