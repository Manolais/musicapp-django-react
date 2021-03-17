import React, { Component } from "react";
import { render } from "react-dom";
import AppRouter from "./router";
// import '../static/css/index.css';

// Class based components

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AppRouter />
      </div>
    );
  }
}

// Function based components

// const App = () => {
//   return (
//     <div>
//       <AppRouter />
//     </div>
//   )
// }

const appDiv = document.getElementById("app");
render(<App />, appDiv);

export default App;
