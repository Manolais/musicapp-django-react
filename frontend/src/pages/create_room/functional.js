import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Link, Redirect } from "react-router-dom";

const CreateRoomPage = () => {
  const maxPeoplePerRoom = 10;
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(1);
  const [maxPeople, setMaxPeople] = useState(5);
  const [roomName, setRoomName] = useState("");
  const [err, setErr] = useState([]);

  const handleGuestCanPause = (e) => {
    setGuestCanPause(!guestCanPause);
  };

  const handleVotesToSkip = (e) => {
    if (votesToSkip <= maxPeople) {
      setVotesToSkip(e.target.value);
    }
  };

  const handleMaxPeople = (e) => {
    setMaxPeople(e.target.value);
  };

  const handleRoomName = (e) => {
    setRoomName(e.target.value);
  };

  const handleButtonPresed = () => {
    /*
    Checks that all the fields are valid when you press
    the button and sends a json object to the api url
    */

    if (!roomName) {
      setErr(["The room name must be at least 1 character long"]);
    } else if (votesToSkip > maxPeople) {
      setErr(["The room votes can't be more than the people that can join"]);
    } else if (maxPeople > maxPeoplePerRoom) {
      setErr(["The room can't have more than 15 users"]);
    } else {
      const responseData = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room_name: roomName,
          max_people: maxPeople,
          guest_can_pause: guestCanPause,
          votes_to_skip: votesToSkip,
        }),
      };
      fetch("/baseapp/home", responseData)
        .then((response) => {
          response.json();
          console.log("ok");
        })
        .then((data) => {
          console.log(data);
        })
        .catch(() => {
          console.log("error");
        });
    }
    console.log("ok");
  };

  const deleteErr = () => {
    setErr([]);
  };

  useEffect(() => {
    if (votesToSkip > maxPeople) {
      setVotesToSkip(maxPeople);
      setErr(["The room votes can't be more than the people that can join"]);
    }
  }, []);

  return (
    <div>
      {/* Redirects you from /create/example to /create
        <Redirect to="/create" /> */}
      {err.map((error) => (
        <Alert
          severity="info"
          onClose={() => {
            deleteErr();
          }}
        >
          {error}
        </Alert>
      ))}
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create Room
          </Typography>
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl>
            <FormHelperText>
              <div align="center">Can people play or pause?</div>
            </FormHelperText>
            <RadioGroup row defaultValue="true" onChange={handleGuestCanPause}>
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />

              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="text"
              placeholder="Room Name"
              onChange={handleRoomName}
              inputProps={{
                style: { textAlign: "center" },
              }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl>
            <FormHelperText>
              <div align="center">
                How many people can enter this room? (Max {maxPeoplePerRoom})
              </div>
            </FormHelperText>
            <TextField
              required={true}
              type="number"
              defaultValue={maxPeople}
              onChange={handleMaxPeople}
              inputProps={{
                min: 1,
                max: maxPeoplePerRoom,
                style: { textAlign: "center" },
              }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl>
            <FormHelperText>
              <div align="center">Votes to skip songs (0 = no skiping)</div>
            </FormHelperText>
            <TextField
              required={true}
              type="number"
              value={votesToSkip}
              defaultValue={votesToSkip}
              onChange={handleVotesToSkip}
              inputProps={{
                min: 0,
                max: maxPeople,
                style: { textAlign: "center" },
              }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
          <Button
            color="secondary"
            variant="contained"
            onClick={handleButtonPresed}
          >
            Create Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" to="/" component={Link}>
            Go Back
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateRoomPage;
