import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";
import swal from "sweetalert";
import Button from "@material-ui/core/Button";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

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
    width: 650,
    // height: 410,
    backgroundColor: "#ffffff",
    // margin:30,
    borderRadius: 10,
  },

  head: {
    width: 650,
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
    padding: 10,
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
    // marginTop: 10,
  },

  dividerstyle: {
    width: 2,
    borderRadius: 4,
  },
}));

export default function Quiz() {
  const classes = useStyles();
  const [getQuizName, setQuizName] = useState("");
  const [getDesc, setDesc] = useState("");
  const [getStartDate, setStartDate] = useState(new Date());
  const [getEndDate, setEndDate] = useState(new Date());
  const [getNoOfQuestion, setNoOfQuestion] = useState("");
  const [getCorrectScore, setCorrectScore] = useState("");
  const [getIncorrectScore, setIncorrectScore] = useState("");
  const [getDuration, setDuration] = useState("");
  const [getMaximumAttempts, setMaximumAttempts] = useState("");
  const [getPassPercentage, setPassPercentage] = useState("");
  const [getViewAnswer, setViewAnswer] = useState("");
  const [getNoSpecificDate, setNoSpecificDate] = useState(new Date());

  const submitQuiz = async () => {
    let body = {
      quiz_name: getQuizName,
      description: getDesc,
      start_date: getStartDate,
      end_date: getEndDate,
      // qids:,
      noq: getNoOfQuestion,
      correct_score: getCorrectScore,
      incorrect_score: getIncorrectScore,
      duration: getDuration,
      maximum_attempts: getMaximumAttempts,
      pass_percentage: getPassPercentage,
      view_answer: getViewAnswer,
      no_specific_date: getNoSpecificDate,
    };

    let result = await postDataAxios("quiz/", body);
    if (result.status) {
      // alert("Record Submit");
      swal("Record Submitted", "", "success");
    } else {
      swal("Record Not Submitted", "", "error");
    }

    setQuizName("");
    setDesc("");
    setStartDate(new Date());
    setEndDate(new Date());
    setNoOfQuestion("");
    setCorrectScore("");
    setIncorrectScore("");
    setDuration("");
    setMaximumAttempts("");
    setPassPercentage("");
    setViewAnswer("");
    setNoSpecificDate(new Date());
  };

  // const submitSubject = async () => {
  //   const body = {
  //     subject: subjectName,
  //   };

  //   let result = await postDataAxios("subject/add", body);
  //   if (result.status) {
  //     swal(result.message, " ", "success", {
  //       buttons: true,
  //     });
  //   } else {
  //     swal(result.message, " ", "error", {
  //       buttons: true,
  //     });
  //   }
  //   setsubjectName("");
  // };

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
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  label="Quiz Name"
                  variant="outlined"
                  value={getQuizName}
                  onChange={(event) => setQuizName(event.target.value)}
                  fullWidth
                  style={{ marginLeft: 10 }}
                />
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  label="Quiz Description"
                  variant="outlined"
                  value={getDesc}
                  onChange={(event) => setDesc(event.target.value)}
                  fullWidth
                  style={{ marginRight: 10 }}
                />
              </Grid>

              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Quiz Start Date"
                    format="MM/dd/yyyy"
                    value={getStartDate}
                    minDate={new Date()}
                    onChange={(date) => setStartDate(date)}
                    fullWidth
                    style={{ marginLeft: 10 }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Quiz End Date"
                    format="MM/dd/yyyy"
                    value={getEndDate}
                    minDate={new Date()}
                    onChange={(date) => setEndDate(date)}
                    fullWidth
                    style={{ marginLeft: 10 }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  label="No Of Questions"
                  variant="outlined"
                  value={getNoOfQuestion}
                  onChange={(event) => setNoOfQuestion(event.target.value)}
                  fullWidth
                  style={{ marginLeft: 10 }}
                />
              </Grid>
              <Grid
                item
                xs={6}
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
                  style={{ marginRight: 10 }}
                />
              </Grid>

              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  label="InCorrect Score"
                  variant="outlined"
                  value={getIncorrectScore}
                  onChange={(event) => setIncorrectScore(event.target.value)}
                  fullWidth
                  style={{ marginLeft: 10 }}
                />
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  label="Duration(in Minutes)"
                  variant="outlined"
                  value={getDuration}
                  onChange={(event) => setDuration(event.target.value)}
                  fullWidth
                  style={{ marginRight: 10 }}
                />
              </Grid>

              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  label="Maximum Attempt"
                  variant="outlined"
                  value={getMaximumAttempts}
                  onChange={(event) => setMaximumAttempts(event.target.value)}
                  fullWidth
                  style={{ marginLeft: 10 }}
                />
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  label="Pass %age"
                  variant="outlined"
                  value={getPassPercentage}
                  onChange={(event) => setPassPercentage(event.target.value)}
                  fullWidth
                  style={{ marginRight: 10 }}
                />
              </Grid>

              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    View Answer
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={getViewAnswer}
                    onChange={(event) => setViewAnswer(event.target.value)}
                    label="View Answer"
                    style={{ marginLeft: 10 }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Yes</MenuItem>
                    <MenuItem value={0}>No</MenuItem>
                  </Select>
                </FormControl>

                {/* <TextField
                  label="View Answer"
                  variant="outlined"
                  value={getViewAnswer}
                  onChange={(event) => setViewAnswer(event.target.value)}
                  fullWidth
                  style={{ marginLeft: 10 }}
                /> */}
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="No Specific Date"
                    format="MM/dd/yyyy"
                    minDate={new Date()}
                    value={getNoSpecificDate}
                    onChange={(date) => setNoSpecificDate(date)}
                    fullWidth
                    style={{ marginLeft: 10 }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>

                {/* <TextField
                  label="No Specific Date"
                  variant="outlined"
                  value={getNoSpecificDate}
                  onChange={(event) => setNoSpecificDate(event.target.value)}
                  fullWidth
                  style={{ marginRight: 10 }}
                /> */}
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
                  onClick={() => submitQuiz()}
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
