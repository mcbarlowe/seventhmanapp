import React, { Component } from 'react';
import Players from './components/players';
import InputForm from './components/input_form';
class App extends Component {
   constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectOptions: [],
    };
   }

  setNewPlayerData = data => {
    this.setState({ data: data });
    console.log(this.state);
  }

  componentDidMount() {
    fetch('http://0.0.0.0:5000/stats/api/v1/players/all', { method: 'get', mode: 'cors' })
    .then(res => res.json())
    .then((data) => {
      this.setState({ data: data, selectOptions: data })
    })
    .catch(console.log)
  }

  render() {
        const {data, selectOptions} = this.state
        if(!data.length)
          return null;
        return (
        <div>
          <InputForm selectOptions={selectOptions} onClick={this.setNewPlayerData}/>
          <Players players={data} />
        </div>
        )
      }
}
export default App;
