import React, { Component } from 'react';
//import InputForm from './components/input_form';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import PlayerTable from './components/player_table/player_table';
import './App.css';
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
  }

  componentDidMount() {
    fetch('http://0.0.0.0:5000/stats/api/v1/players/all/', { method: 'get', mode: 'cors' })
    .then(res => res.json())
    .then((data) => {
      this.setState({ data: data })
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
    return (
    <div>
      <div>
        <h1 id="banner">The Seventh Man</h1>
      </div>
      <div>
        <Tabs>
          <TabList>
            <Tab>Players</Tab>
            <Tab>Teams</Tab>
            <Tab>About</Tab>
          </TabList>

          <TabPanel>
            <PlayerTable
              seasonSelect={seasonSelect}
              teamSelect={teamSelect}
              playerSelect={playerSelect}
              onClick={this.setNewPlayerData}
              data={data}
            />
          </TabPanel>
          <TabPanel>
            <p>Team stats will go here</p>
          </TabPanel>
          <TabPanel>
            <p>Some about material here</p>
          </TabPanel>
        </Tabs>
      </div>
    </div>
    )
  }
}
export default App;
