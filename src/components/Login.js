import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../actions/users";

import logo from "../assets/logo-img.jpeg";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Alert } from "@mui/material";

function Login({ users, dispatch }) {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user !== "") {
      dispatch(handleLogin(user));
      setUser("");
      navigate("/home");
    }
    setErrors({ onSubmitted: "Please select a User." });
  };

  return (
    <div className="login-info">
      <h1 className="center">Employee Polls</h1>
      <div className="imgcontainer">
        <img src={logo} alt="Login Avatar" className="avatar" />
      </div>
      <h1 className="center">Log In</h1>
      <FormControl sx={{ m: 1, width: 320, margin: "auto" }} onSubmit={handleSubmit}>
        <InputLabel id="uid">Users</InputLabel>
        <Select
          data-testid="uid"
          labelId="uid"
          id="uid"
          onChange={({ target: { value } }) => setUser(value)}
          value={user}
        >
          {users.map((uid) => (
            <MenuItem key={uid} value={uid}>
              {uid}
            </MenuItem>
          ))}
        </Select>
        <Button data-testid="submit-button" variant="contained" onClick={handleSubmit}>
          Ok
        </Button>
        {errors.hasOwnProperty("onSubmitted") && (
          <Alert data-testid="alert" severity="error">{errors.onSubmitted}</Alert>
        )}
      </FormControl>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { users: Object.keys(state.users) };
};

export default connect(mapStateToProps)(Login);
