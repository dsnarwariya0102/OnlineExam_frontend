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
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
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
  const classes = useStyles();
  const [getQuesType, setQuesType] = useState("");
  const [getQuestion, setQuestion] = useState("");
  const [getDesc, setDesc] = useState("");
  const [getCorrectScore, setCorrectScore] = useState("");
  const [getIncorrectScore, setIncorrectScore] = useState("");
  // const [getList,setList]=useState([])
  const [getOption, setOption] = useState([]);
  const [checked, setChecked] = useState([]);

  // const [getOptionA, setOptionA] = useState("");
  // const [getOptionB, setOptionB] = useState("");
  // const [getOptionC, setOptionC] = useState("");
  // const [getOptionD, setOptionD] = useState("");
  // const [checkedA, setCheckedA] = useState(false);
  // const [checkedB, setCheckedB] = useState(false);
  // const [checkedC, setCheckedC] = useState(false);
  // const [checkedD, setCheckedD] = useState(false);

  function handleAdd() {
    const values = [...getOption];
    values.push({ value: null });
    setOption(values);
    const checkedValues = [...checked];
    checkedValues.push(false);
    setChecked(checkedValues);
  }

  function handleRemove(i) {
    const values = [...getOption];
    values.splice(i, 1);
    setOption(values);
  }

  const handleChange = (i, event) => {
    // console.log(i, event.target.checked);
    const values = [...checked];
    if (event.target.checked) {
      values[i] = true;
    } else {
      values[i] = 0;
    }
    // console.log(values);
    setChecked(values);
  };

  function handleOption(i, event) {
    const values = [...getOption];
    values[i] = event;
    setOption(values);
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
      const checkedValues = [...checked];
      var i = 0;
      checkedValues.map((item, index) => {
        if (item === true) {
          i = index;
        }
      });

      checkedValues[i] = getCorrectScore;
      let body = {
        qid: result.data.insertId,
        q_option: getOption,
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
              {getOption.map(({ getOption, checked }, idx) => {
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
                        onChange={(event) => handleOption(idx, event)}
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
                        onChange={(event) => handleChange(idx, event)}
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
              {/* <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  label="Option A"
                  variant="outlined"
                  value={getOptionA}
                  onChange={(event) => setOptionA(event.target.value)}
                  fullWidth
                  style={{ marginLeft: 10 }}
                />
                <Checkbox
                  // defaultChecked
                  color="default"
                  inputProps={{
                    "aria-label": "checkbox with default color",
                  }}
                  onChange={(event) => setCheckedA(event.target.checked)}
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
                  label="Option B"
                  variant="outlined"
                  value={getOptionB}
                  onChange={(event) => setOptionB(event.target.value)}
                  fullWidth
                  style={{ marginRight: 10 }}
                />
                <Checkbox
                  // defaultChecked
                  color="default"
                  inputProps={{
                    "aria-label": "checkbox with default color",
                  }}
                  onChange={(event) => setCheckedB(event.target.checked)}
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
                  label="Option C"
                  variant="outlined"
                  value={getOptionC}
                  onChange={(event) => setOptionC(event.target.value)}
                  fullWidth
                  style={{ marginLeft: 10 }}
                />
                <Checkbox
                  // defaultChecked
                  color="default"
                  inputProps={{
                    "aria-label": "checkbox with default color",
                  }}
                  onChange={(event) => setCheckedC(event.target.checked)}
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
                  label="Option D"
                  variant="outlined"
                  value={getOptionD}
                  onChange={(event) => setOptionD(event.target.value)}
                  fullWidth
                  style={{ marginRight: 10 }}
                />
                <Checkbox
                  // defaultChecked
                  color="default"
                  inputProps={{
                    "aria-label": "checkbox with default color",
                  }}
                  onChange={(event) => setCheckedD(event.target.checked)}
                />
              </Grid> */}
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
