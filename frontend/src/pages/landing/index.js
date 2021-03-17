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
import { Link } from 'react-router-dom'

export class LandingPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>This is a landing page</h1>
      </div>
    );
  }
}

export default LandingPage;
