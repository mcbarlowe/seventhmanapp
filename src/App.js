import React, { Component } from 'react';
import Players from './components/players';
import InputForm from './components/input_form';
class App extends Component {
   constructor(props) {
    super(props);
    this.state = {
      data: [],
      teamSelect: [],
      playerSelect: [],
      seasonSelect: []
    };
   }

  setNewPlayerData = data => {
    this.setState({ data: data });
    console.log(this.state);
  }

  componentDidMount() {
    fetch('http://0.0.0.0:5000/stats/api/v1/players/all/', { method: 'get', mode: 'cors' })
    .then(res => res.json())
    .then((data) => {
      this.setState({ data: data, selectOptions: data })
    })
    .catch(console.log);
    fetch('http://0.0.0.0:5000/stats/api/v1/teams/all/', { method: 'get', mode: 'cors' })
    .then(res => res.json())
    .then((data) => {
      this.setState({ teamSelect: data })
    })
    .catch(console.log);
    fetch('http://0.0.0.0:5000/stats/api/v1/players/distinct/', { method: 'get', mode: 'cors' })
    .then(res => res.json())
    .then((data) => {
      this.setState({ playerSelect: data })
    })
    .catch(console.log);
    fetch('http://0.0.0.0:5000/stats/api/v1/seasons/all', { method: 'get', mode: 'cors' })
    .then(res => res.json())
    .then((data) => {
      this.setState({ seasonSelect: data })
    })
    .catch(console.log);
  }

  render() {
        const {data, teamSelect, playerSelect, seasonSelect} = this.state
        if(!playerSelect.length)
          return null;
        console.log(this.state);
        return (
        <div>
          <InputForm teamOptions={teamSelect}  playerOptions={playerSelect} seasonOptions={seasonSelect} onClick={this.setNewPlayerData}/>
          <Players players={data} />
        </div>
        )
      }
}
export default App;
