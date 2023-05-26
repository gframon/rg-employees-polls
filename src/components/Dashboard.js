import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Question from "./Question";

const Dashboard = ({ isLogged, sections }) => {
  const [value, setValue] = useState("new");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged, navigate]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box>
          <Box
            sx={{
              width: "100%",
              border: "solid 1px #ACACAC",
              borderRadius: "5px",
              marginTop: "20px",
            }}
          >
            <Tabs
              orientation="horizontal"
              value={value}
              onChange={handleChange}
              sx={{ borderRight: 1, borderColor: "divider" }}
              centered
            >
              <Tab value={"new"} label="New Questions" />
              <Tab value={"done"} label="Done" />
            </Tabs>
          </Box>
          <Box
            sx={{
              padding: 2,
              border: "solid 1px #ACACAC",
              borderRadius: "5px",
              marginTop: "20px",
            }}
          >
            {value === "new" && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignContent: "space-between",
                  margin: "10px",
                }}
              >
                {sections[value].map((id) => (
                  <Question key={id} id={id} />
                ))}
              </Box>
            )}
            {value === "done" && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignContent: "space-between",
                  margin: "10px",
                }}
              >
                {sections[value].map((id) => (
                  <Question key={id} id={id} />
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  const { questions, authedUser } = state;
  let dashboard = { new: [], done: [] };
  Object.values(questions)
    .sort((a, b) => b.timestamp - a.timestamp)
    .map(({ id, optionOne, optionTwo }) => {
      return optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser)
        ? dashboard.done.push(id)
        : dashboard.new.push(id);
    });

  return {
    isLogged: authedUser !== null,
    sections: { ...dashboard },
  };
};

export default connect(mapStateToProps)(Dashboard);
