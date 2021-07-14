/* eslint-disable array-callback-return */
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Checkbox from "@material-ui/core/Checkbox";
import { postDataAxios } from "../../../config/FetchServices";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  maincontainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },

  mainpaper: {
    //width:window.innerWidth*0.5,
    width: 500,
    // height: 810,
    backgroundColor: "#ffffff",
    // margin:30,
    borderRadius: 10,
  },

  head: {
    width: 500,
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
export default function QuestionBank() {
  const dispatch = useDispatch();

  const QuestionOptionData = useSelector((state) => state.questionoption);
  const questionoption = Object.keys(QuestionOptionData);
  const question = Object.values(QuestionOptionData);
  console.log("useSelectorData", question);

  const classes = useStyles();
  const [getQuesType, setQuesType] = useState("");
  const [getQuestion, setQuestion] = useState("");
  const [getDesc, setDesc] = useState("");
  const [getCorrectScore, setCorrectScore] = useState("");
  const [getIncorrectScore, setIncorrectScore] = useState("");

  const [getOption, setOption] = useState([]);
  const [checked, setChecked] = useState([]);
  const [Refresh, setRefresh] = useState(false);

  function handleAdd() {
    dispatch({
      type: "ADD_OPTION",
      payload: [new Date().valueOf(), { checked: false }],
    });
    setRefresh(!Refresh);
  }

  function handleRemove(i) {
    const values = [...getOption];
    values.splice(i, 1);
    setOption(values);
  }

  const handleChange = (item, event) => {
    var values = "";
    if (event.target.checked) {
      values = true;
    }

    question.map((data) => {
      if (item == data.id) {
        let body = {
          id: item,
          checked: values,
          option: data.option,
        };

        dispatch({ type: "EDIT_OPTION", payload: [body.id, body] });
        setRefresh(!Refresh);
      }
    });
  };

  function handleOption(item, event) {
    let body = {
      id: item,
      checked: 0,
      option: event,
    };

    dispatch({ type: "EDIT_OPTION", payload: [body.id, body] });
    setRefresh(!Refresh);
  }

  const submitQuizBank = async () => {
    let body = {
      question_type: getQuesType,
      question: getQuestion,
      description: getDesc,
      correct_score: getCorrectScore,
      incorrect_score: getIncorrectScore,
    };
    console.log("Outerbody", body);

    let result = await postDataAxios("questionbank/", body);
    if (result.status) {
      const checkedValues = [...question];
      var optionarr = [];
      var i = 0;
      checkedValues.map((item, index) => {
        if (item.checked === true) {
          i = index;
        }
        optionarr.push(item.option);
      });
      checkedValues[i] = getCorrectScore;

      let body = {
        qid: result.data.insertId,
        q_option: optionarr,
        q_option_match: 0,
        score: checkedValues,
      };

      console.log("Inerbody", body);
      let rslt = await postDataAxios("questionoptions/", body);
      if (rslt.status) {
        swal("Record Submitted", "", "success");
      }
    } else {
      swal("Record Not Submitted", "", "error");
    }
    dispatch({ type: "CLEAR_DATA" });
    setRefresh(!Refresh);
    setQuesType("");
    setQuestion("");
    setDesc("");
    setChecked([]);
    setOption([]);
    setCorrectScore("");
    setIncorrectScore("");
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
                    value={getQuesType}
                    onChange={(event) => setQuesType(event.target.value)}
                    label="Question Type"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Multiple Choice single Answer"}>
                      Multiple Choice Single Answer
                    </MenuItem>
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
                  label="Question"
                  variant="outlined"
                  value={getQuestion}
                  onChange={(event) => setQuestion(event.target.value)}
                  fullWidth
                  multiline
                  rows={3}
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
                  label="Description"
                  variant="outlined"
                  value={getDesc}
                  onChange={(event) => setDesc(event.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                  style={{ marginRight: 10, marginLeft: 10 }}
                />
              </Grid>
              {questionoption.map((item, idx) => {
                return (
                  <>
                    <Grid
                      item
                      xs={12}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div style={{ fontWeight: "bold" }}>Option: </div>
                      <ReactQuill
                        // value={getOption}
                        onChange={(event) => handleOption(item, event)}
                        style={{ width: 420 }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div>Correct Answer</div>
                      <Checkbox
                        color="default"
                        inputProps={{
                          "aria-label": "checkbox with default color",
                        }}
                        // onChange={(event) => alert()}
                        onChange={(event) => handleChange(item, event)}
                      />
                    </Grid>
                  </>
                );
              })}
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="outlined"
                  className={classes.button}
                  style={{ width: 150 }}
                  color="primary"
                  onClick={() => handleAdd()}
                >
                  Add Options
                </Button>
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
                  label="InCorrect Score"
                  variant="outlined"
                  value={getIncorrectScore}
                  onChange={(event) => setIncorrectScore(event.target.value)}
                  fullWidth
                  style={{ marginRight: 10 }}
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
