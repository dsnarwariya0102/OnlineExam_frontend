import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";
import swal from "sweetalert";
import Button from "@material-ui/core/Button";
import { postDataAxios } from "../../config/FetchServices";
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
    height: 410,
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

export default function Subject(props) {
  const classes = useStyles();
  const [subjectName, setsubjectName] = useState("");

  const submitSubject = async () => {
    const body = {
      subject: subjectName,
    };

    let result = await postDataAxios("subject/add", body);
    if (result.status) {
      swal(result.message, " ", "success", {
        buttons: true,
      });
    } else {
      swal(result.message, " ", "error", {
        buttons: true,
      });
    }
    setsubjectName("");
  };

  return (
    <div>
      <div className={classes.maincontainer}>
        <Paper className={classes.mainpaper}>
          <div className={classes.head}>
            <div className={classes.mainheading}> Subject Register </div>
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
                <TextField
                  label="Subject Name"
                  variant="outlined"
                  value={subjectName}
                  onChange={(event) => setsubjectName(event.target.value)}
                  fullWidth
                  style={{ marginLeft: 20, marginRight: 20 }}
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
                <Button
                  variant="outlined"
                  className={classes.button}
                  style={{ width: 150 }}
                  color="primary"
                  onClick={() => submitSubject()}
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
