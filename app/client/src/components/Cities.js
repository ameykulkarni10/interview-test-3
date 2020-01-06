import React from "react";

class Cities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  handleChange = event => {
    fetch(`http://localhost:8000/state/:name/${event.target.value}`)
      .then(response => response.json())
      .then(data => this.setState({ data }));
  };
  render() {
    const citiList = this.props.data.map(data => {
      return <option>{data}</option>;
    });

    const { data } = this.state;
    data.length
      ? alert(`state: ${data[0].state_name} city_name:${data[0].city_name}`)
      : console.log("loading");

    return <select onChange={this.handleChange}>{citiList}</select>;
  }
}

export default Cities;
