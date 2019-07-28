import React, { Component } from 'react';
import Players from './components/players';
import InputForm from './components/input_form';
class App extends Component {
   constructor() {
    super();
    this.state = {
      players: [],
    };
   }

  componentDidMount() {
    fetch('http://0.0.0.0:5000/stats/api/v1/players/all', { method: 'get', mode: 'cors' })
    .then(res => res.json())
    .then((data) => {
      this.setState({ players: data })
    })
    .catch(console.log)
  }
  handelSubmit() {

  }
  render() {
        const {players} = this.state
        if(!players.length)
          return null;
        return (
        <div>
          <InputForm />
          <Players players={players} />
        </div>
        )
      }
}
export default App;
