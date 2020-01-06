import React from "react";
import "./App.css";
import Cities from "./components/Cities";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCities: true,
      data: []
    };
  }
  componentDidMount() {
    fetch("http://localhost:8000/state/:name")
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }
  render() {
    const data = this.state;
    console.log(data);
    return <Cities data={this.state.data} />;
  }
}

export default App;
