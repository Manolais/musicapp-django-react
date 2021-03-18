import React, { Component } from "react";
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

export class CreateRoomPage extends Component {
  constructor(props) {
    super(props);
    this.defaultVotes = 1;
    this.defaultPeople = 5; // The default number of people allowed to enter the room
    this.state = {
      guestCanPause: true,
      votesToSkip: this.defaultVotes,
      maxPeople: this.defaultPeople,
      roomName: "",
      err: [],
    };
    this.handleGuestCanPause = this.handleGuestCanPause.bind(this);
    this.handleVoteToSkip = this.handleVoteToSkip.bind(this);
    this.handleMaxPeople = this.handleMaxPeople.bind(this);
    this.handleRoomName = this.handleRoomName.bind(this);
    this.handleButtonPresed = this.handleButtonPresed.bind(this);
    this.deleteErr = this.deleteErr.bind(this);
  }

  handleGuestCanPause(e) {
    this.setState({
      guestCanPause: !this.state.guestCanPause,
    });
    // console.log(this.state.guestCanPause);
  }

  handleVoteToSkip(e) {
    if (this.state.votesToSkip <= this.state.maxPeople) {
      this.setState({
        votesToSkip: e.target.value,
      });
    }
    // this.setState({
    //   votesToSkip: e.target.value,
    // });

    // console.log(this.state.votesToSkip);
  }

  handleMaxPeople(e) {
    this.setState({
      maxPeople: e.target.value,
    });
    // console.log(this.state.maxPeople);
  }

  handleRoomName(e) {
    this.setState({
      roomName: e.target.value,
    });
    // console.log(this.state.roomName);
  }

  handleButtonPresed() {
    /*
    Checks that all the fields are valid when you press
    the button and sends a json object to the api url
    */

    if (!this.state.roomName) {
      this.setState({
        err: ["The room name must be at least 1 character long"],
      });
    } else if (this.state.votesToSkip > this.state.maxPeople) {
      this.setState({
        err: ["The room votes can't be more than the people that can join"],
      });
    } else if (this.state.maxPeople > 15) {
      this.setState({
        err: ["The room can't have more than 15 users"],
      });
    } else {
      console.log(typeof this.state.maxPeople);
      console.log(typeof this.state.votesToSkip);
      const responseData = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room_name: this.state.roomName,
          max_people: this.state.maxPeople,
          guest_can_pause: this.state.guestCanPause,
          votes_to_skip: this.state.votesToSkip,
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
    console.log(this.state);
  }

  deleteErr() {
    this.setState({
      err: [],
    });
  }

  componentDidMount() {
    // Ches if the votes are more that the actual people that can join the room
    if (this.state.votesToSkip > this.state.maxPeople) {
      this.setState({
        // votesToSkip: this.state.votesToSkip - (this.state.maxPeople - this.state.votesToSkip),
        votesToSkip: this.state.maxPeople,
        err: ["The room votes can't be more than the people that can join"],
      });
    }
  }

  render() {
    return (
      <div>
        {/* Redirects you from /create/example to /create
        <Redirect to="/create" /> */}
        {this.state.err.map((error) => (
          <Alert
            severity="info"
            onClose={() => {
              this.deleteErr();
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
              <RadioGroup
                row
                defaultValue="true"
                onChange={this.handleGuestCanPause}
              >
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
                onChange={this.handleRoomName}
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
                  How many people can enter this room? (max 15)
                </div>
              </FormHelperText>
              <TextField
                required={true}
                type="number"
                defaultValue={this.defaultPeople}
                onChange={this.handleMaxPeople}
                inputProps={{
                  min: 1,
                  max: 9,
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
                value={this.state.votesToSkip}
                defaultValue={this.defaultVotes}
                onChange={this.handleVoteToSkip}
                inputProps={{
                  min: 0,
                  max: this.state.maxPeople,
                  style: { textAlign: "center" },
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} align="center">
            <Button
              color="secondary"
              variant="contained"
              onClick={this.handleButtonPresed}
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
  }
}

export default CreateRoomPage;
