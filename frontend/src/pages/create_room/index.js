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
import { Link, Redirect } from "react-router-dom";

export class CreateRoomPage extends Component {
  constructor(props) {
    super(props);
    this.defaultVotes = 0;
    this.defaultPeople = 5; // The default number of people allowed to enter the room
    this.state = {
      guestCanPause: false,
      votesToSkip: this.defaultVotes,
    };
    this.handleGuestCanPause = this.handleGuestCanPause.bind(this);
    this.handleVoteToSkip = this.handleVoteToSkip.bind(this);
  }

  handleGuestCanPause(e) {
    this.setState({
      guestCanPause: !this.state.guestCanPause,
    });
    console.log(this.state.guestCanPause);
  }

  handleVoteToSkip(e) {
    this.setState({
      votesToSkip: e.target.value,
    });
  }

  render() {
    return (
      <div>
        {/* Redirects you from /create/example to /create */}
        <Redirect to="/create" />
        <Grid container spacing={1}>
          <Grid item xs={12} align="center">
            <Typography component="h4" variant="h4">
              Create Room
            </Typography>
          </Grid>

          <Grid item xs={12} align="center">
            <FormControl>
              <FormHelperText>
                This is a create room page for you
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
                inputProps={{
                  style: { textAlign: "center" },
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} align="center">
            <FormControl>
              <FormHelperText>
                How many people can enter this room?
              </FormHelperText>
              <TextField
                required={true}
                type="number"
                defaultValue={this.defaultPeople}
                inputProps={{
                  min: 1,
                  style: { textAlign: "center" },
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} align="center">
            <FormControl>
              <FormHelperText>Votes to skip songs</FormHelperText>
              <TextField
                required={true}
                type="number"
                defaultValue={this.defaultVotes}
                inputProps={{
                  min: 0,
                  style: { textAlign: "center" },
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} align="center">
            <Button color="secondary" variant="contained">
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
