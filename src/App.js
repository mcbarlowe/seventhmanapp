import React, { Component } from 'react';
//import InputForm from './components/input_form';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import PlayerTable from './components/player_table/player_table';
import TeamTable from './components/team_table/team_table';
import PlayerPossessionTable from './components/player_table/player_possession_table';
import TeamPossessionTable from './components/team_table/team_possession_table';
import PlayerAdvancedTable from './components/player_table/player_advanced';
import TeamAdvancedTable from './components/team_table/team_advanced_table';
import PlayerRapmTable from './components/player_table/player_single_year_rapm_table';
import PlayerMultiRapmTable from './components/player_table/player_multi_year_rapm_table';
import TeamRapmTable from './components/team_table/team_single_year_rapm_table';
import ShotChart from './components/shot_charts/shot_charts';
import ReactGA from 'react-ga';
import './App.css';


ReactGA.initialize('UA-148496663-1');
class App extends Component {
   constructor(props) {
    super(props);
    this.state = {
      teamSelect: [],
      playerSelect: [],
      seasonSelect: [],
      multiRapmSeasonSelect: []
    };
   }


  componentDidUpdate = () => ReactGA.pageview(window.location.pathname + window.location.search);
  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
    fetch('https://stats.theseventhman.net/stats/api/v2/teams/all/', { method: 'get', mode: 'cors' })
    .then(res => res.json())
    .then((data) => {
      this.setState({ teamSelect: data })
    })
    .catch(console.log);
    fetch('https://stats.theseventhman.net/stats/api/v2/seasons/all/', { method: 'get', mode: 'cors' })
    .then(res => res.json())
    .then((data) => {
      this.setState({ seasonSelect: data })
    })
    .catch(console.log);
    fetch('https://stats.theseventhman.net/stats/api/v2/multirapmseasons/all/', { method: 'get', mode: 'cors' })
    .then(res => res.json())
    .then((data) => {
      this.setState({ multiRapmSeasonSelect: data })
    })
    .catch(console.log);
    fetch('https://stats.theseventhman.net/stats/api/v2/players/distinct/', { method: 'get', mode: 'cors' })
    .then(res => res.json())
    .then((data) => {
      this.setState({ playerSelect: data })
    })
    .catch(console.log);
  }

  render() {
    const {teamSelect, playerSelect, seasonSelect, multiRapmSeasonSelect} = this.state
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
               contact me on <a href='https://twitter.com/the7thmansite'>Twitter</a>. Thanks
               for coming and I hope you enjoy the site and find it useful.
           </p>
           <p style={pStyle}> Also special thanks to <a href='https://twitter.com/rd11490'>Ryan Davis</a>.
            Without his <a href='https://github.com/rd11490/NBA_Tutorials'>RAPM tutorials</a> this site
            would not have RAPM near as quickly as it has. He also has a <a href='http://nbashotcharts.com/home'>site</a> which
            is very good and you should check out as well.
          </p>
          </TabPanel>
          <TabPanel>
            <Tabs>
              <TabList>
                <Tab>Per Game</Tab>
                <Tab>Possession</Tab>
                <Tab>Advanced</Tab>
                <Tab>RAPM</Tab>
                <Tab>3 Year RAPM</Tab>
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
                <PlayerAdvancedTable
                  seasonSelect={seasonSelect}
                  playerSelect={playerSelect}
                />
              </TabPanel>
              <TabPanel>
                <PlayerRapmTable
                  seasonSelect={seasonSelect}
                  playerSelect={playerSelect}
                />
              </TabPanel>
              <TabPanel>
                <PlayerMultiRapmTable
                  seasonSelect={multiRapmSeasonSelect}
                  playerSelect={playerSelect}
                />
              </TabPanel>
            </Tabs>
          </TabPanel>
          <TabPanel>
            <Tabs>
              <TabList>
                <Tab>Per Game</Tab>
                <Tab>Possession</Tab>
                <Tab>Advanced</Tab>
                <Tab>RAPM</Tab>
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
                <TeamAdvancedTable
                  seasonSelect={seasonSelect}
                  teamSelect={teamSelect}
                />
              </TabPanel>
              <TabPanel>
                <TeamRapmTable
                  seasonSelect={seasonSelect}
                  teamSelect={teamSelect}
                />
              </TabPanel>
            </Tabs>
          </TabPanel>
          <TabPanel>
            <ShotChart
              seasonSelect={seasonSelect}
              teamSelect={teamSelect}
              playerSelect={playerSelect}
            />
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
