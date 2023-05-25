import { connect } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";

import Avatar from "@mui/material/Avatar";

const Leaderboard = ({ users }) => {
  return (
    <TableContainer>
      <Table
        sx={{
          margin: "auto",
          marginTop: "10px",
          width: 650,
          border: "solid 1px #ACACAC",
          borderRadius: 1,
        }}
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: "#eceff1" }}>
            <TableCell>Users</TableCell>
            <TableCell align="right">Answered</TableCell>
            <TableCell align="right">Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <>
                  <Avatar alt={user.name} src={user.avatarURL} />
                  <Typography variant="h6" display="block">
                    {user.name}
                  </Typography>
                  <Typography variant="caption">{user.id}</Typography>
                </>
              </TableCell>
              <TableCell align="right">{user.answered}</TableCell>
              <TableCell align="right">{user.created}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  let usersArray = [];
  Object.keys(users)
    .sort((a, b) => {
      const sortA =
        Object.keys(users[a].answers).length + Object.keys(users[a].questions).length;
      const sortB =
        Object.keys(users[b].answers).length + Object.keys(users[b].questions).length;
      return sortB - sortA;
    })
    .map((id) =>
      usersArray.push({
        id,
        name: users[id].name,
        avatarURL: users[id].avatarURL,
        answered: Object.keys(users[id].answers).length,
        created: Object.keys(users[id].questions).length,
      })
    );
  return {
    authedUser,
    users: usersArray,
  };
};

export default connect(mapStateToProps)(Leaderboard);
