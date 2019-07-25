import React, { Component } from 'react';
import Players from './components/players';

class App extends Component {

  state = {
    players: []
  }

  componentDidMount() {
    fetch('http://0.0.0.0:5000/stats/api/v1/players/all', { method: 'get', mode: 'cors' })
    .then(res => res.json())
    .then((data) => {
      this.setState({ players: data })
    })
    .catch(console.log)
  }
  render() {
        return (
          <Players players={this.state.players} />
        )
      }
}
export default App;
