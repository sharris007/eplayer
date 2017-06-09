import React from 'react';

class Root extends React.Component {
  constructor(props) {
    super(props);
    console.log("Root constructor : ", props)
    this.state = {
      name: ''
    };

    this.handleChange  = (e) => {
      var newName = e.target.value;

      this.setState({
        name: newName
      });
    }
  }

  componentDidMount() {
    console.log("Root componentDidMount")
  }

  render() {
    return (
      <div id= "demo-content">
        <label> Hiii </label>
      </div>
    );
  }
}

export default Root;
