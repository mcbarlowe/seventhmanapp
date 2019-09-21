import React, { Component } from 'react';
//import InputForm from './components/input_form';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import PlayerTable from './components/player_table/player_table';
import TeamTable from './components/team_table/team_table';
import PlayerPossessionTable from './components/player_table/player_possession_table';
import TeamPossessionTable from './components/team_table/team_possession_table';
import './App.css';
class App extends Component {
   constructor(props) {
    super(props);
    this.state = {
      teamSelect: [],
      playerSelect: [],
      seasonSelect: []
    };
   }


  componentDidMount() {
    fetch('https://stats.theseventhman.net/stats/api/v1/teams/all/', { method: 'get', mode: 'cors' })
    .then(res => res.json())
    .then((data) => {
      this.setState({ teamSelect: data })
    })
    .catch(console.log);
    fetch('https://stats.theseventhman.net/stats/api/v1/players/distinct/', { method: 'get', mode: 'cors' })
    .then(res => res.json())
    .then((data) => {
      this.setState({ playerSelect: data })
    })
    .catch(console.log);
    fetch('https://stats.theseventhman.net/stats/api/v1/seasons/all', { method: 'get', mode: 'cors' })
    .then(res => res.json())
    .then((data) => {
      this.setState({ seasonSelect: data })
    })
    .catch(console.log);
  }

  render() {
    const {teamSelect, playerSelect, seasonSelect} = this.state
    const pStyle = {padding: "10px", width: "60%"}
    if(!playerSelect.length)
      return null;
    return (
    <div>
      <div>
        <h1 id="banner">The Seventh Man</h1>
      </div>
      <div >
        <Tabs>
          <TabList>
            <Tab>About</Tab>
            <Tab>Players</Tab>
            <Tab>Teams</Tab>
            <Tab>Shot Charts</Tab>
            <Tab>Articles</Tab>
          </TabList>
          <TabPanel>
            <p style={pStyle}>This is a website of NBA stats created by Matthew Barlowe. A lot of
               the site is still in progress. If you
               have any questions or comments or notice any errors please email me at
               <a href='mailto:matt@theseventhman.net'> matt@seventhman.net</a> or
               contact me on <a href='https://twitter.com/matt_barlowe'>Twitter</a>. Thanks
               for coming and I hope you enjoy the site and find it useful.
           </p>
          </TabPanel>
          <TabPanel>
            <Tabs>
              <TabList>
                <Tab>Per Game Stats</Tab>
                <Tab>Possession Stats</Tab>
                <Tab>Advanced Stats</Tab>
              </TabList>
              <TabPanel>
                <PlayerTable
                  seasonSelect={seasonSelect}
                  teamSelect={teamSelect}
                  playerSelect={playerSelect}
                />
              </TabPanel>
              <TabPanel>
                <PlayerPossessionTable
                  seasonSelect={seasonSelect}
                  teamSelect={teamSelect}
                  playerSelect={playerSelect}
                />
              </TabPanel>
              <TabPanel>
                <p style={pStyle}>These are going to be super advanced because I am smrt</p>
              </TabPanel>
            </Tabs>
          </TabPanel>
          <TabPanel>
            <Tabs>
              <TabList>
                <Tab>Per Game Stats</Tab>
                <Tab>Possession Stats</Tab>
                <Tab>Advanced Stats</Tab>
              </TabList>
              <TabPanel>
                <TeamTable
                  seasonSelect={seasonSelect}
                  teamSelect={teamSelect}
                />
              </TabPanel>
              <TabPanel>
                <TeamPossessionTable
                  seasonSelect={seasonSelect}
                  teamSelect={teamSelect}
                />
              </TabPanel>
              <TabPanel>
                <p style={pStyle}>Why are we talking about advanced stats for teams when the only stat we need is wins baby!</p>
              </TabPanel>
            </Tabs>
          </TabPanel>
          <TabPanel>
            <p style={pStyle}>Shot Charts and things of that nature will go here</p>
          </TabPanel>
          <TabPanel>
            <p style={pStyle}>Plan to write things about basketball. It will be genius but you won't understand it so you'll tell all your friends it sucks</p>
          </TabPanel>
        </Tabs>
      </div>
    </div>
    )
  }
}
export default App;
