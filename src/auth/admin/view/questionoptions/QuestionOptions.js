import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";
import swal from "sweetalert";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { postDataAxios } from "../../../config/FetchServices";
const useStyles = makeStyles((theme) => ({
  maincontainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },

  mainpaper: {
    //width:window.innerWidth*0.5,
    width: 450,
    // height: 410,
    backgroundColor: "#ffffff",
    // margin:30,
    borderRadius: 10,
  },

  head: {
    width: 450,
    height: 50,
    backgroundImage:
      "linear-gradient(to left, black 5px , #2979ff 600px ,black)",
    // backgroundColor:'#ececec',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },

  mainheading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontSize: 20,
    padding: "5px 0px 0px 0px",
  },

  large: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: theme.spacing(10),
    height: theme.spacing(10),
  },

  input: {
    display: "none",
  },

  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  dividerstyle: {
    width: 2,
    borderRadius: 4,
  },
}));
export default function QuestionOptions() {
  const classes = useStyles();
  const [getQuestId, setQuestId] = useState("");
  const [getQuestionOptions, setQuestionOptions] = useState("");
  const [getQuestionOptionsMatch, setQuestionOptionsMatch] = useState("");
  const [getCorrectScore, setCorrectScore] = useState("");

  const submitQuizBank = async () => {
    let body = {
      qid: getQuestId,
      q_option: getQuestionOptions,
      q_option_match: getQuestionOptionsMatch,
      score: getCorrectScore,
    };
    let result = await postDataAxios("questionbank/", body);
    if (result.status) {
      // alert("Record Submit");
      swal("Record Submitted", "", "success");
    } else {
      swal("Record Not Submitted", "", "error");
    }
    setQuestId("");
    setQuestionOptions("");
    setQuestionOptionsMatch("");
    setCorrectScore("");
  };

  return (
    <div>
      <div className={classes.maincontainer}>
        <Paper className={classes.mainpaper}>
          <div className={classes.head}>
            <div className={classes.mainheading}> Quiz </div>
          </div>
          <div>
            <Grid container spacing={2} style={{ marginTop: 10 }}>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl
                  variant="outlined"
                  fullWidth
                  style={{ marginLeft: 10, marginRight: 10 }}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    View Answer
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={getQuestId}
                    onChange={(event) => setQuestId(event.target.value)}
                    label="Question Type"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Multiple Choice"}>
                      Multiple Choice
                    </MenuItem>
                    <MenuItem value={"Single Answer"}>Single Answer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  label="Question Options"
                  variant="outlined"
                  value={getQuestionOptions}
                  onChange={(event) => setQuestionOptions(event.target.value)}
                  fullWidth
                  multiline
                  rows={2}
                  style={{ marginRight: 10, marginLeft: 10 }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  label="Question Option Match"
                  variant="outlined"
                  value={getQuestionOptionsMatch}
                  onChange={(event) =>
                    setQuestionOptionsMatch(event.target.value)
                  }
                  fullWidth
                  multiline
                  rows={2}
                  style={{ marginRight: 10, marginLeft: 10 }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  label="Correct Score"
                  variant="outlined"
                  value={getCorrectScore}
                  onChange={(event) => setCorrectScore(event.target.value)}
                  fullWidth
                  style={{ marginLeft: 10, marginRight: 10 }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: 20,
                }}
              >
                <Button
                  variant="outlined"
                  className={classes.button}
                  style={{ width: 150 }}
                  color="primary"
                  onClick={() => submitQuizBank()}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
    </div>
  );
}
