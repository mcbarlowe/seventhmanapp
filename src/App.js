import React, { Component } from 'react';
import Players from './components/players';
import InputForm from './components/input_form';
import ReactTable from 'react-table';
import '../node_modules/react-table/react-table.css';
//import dataTable from './components/table_form';
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
    const columns =  [
      {
        Header: "Season",
        accessor: "season",
        style: {
          textAlign: "right"
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Player",
        accessor: "player_name",
        style: {
          textAlign: "right"
        },
        width: 150,
        maxWidth: 150,
        minWidth: 150
      },
      {
        Header: "Teams",
        accessor: "teams",
        style: {
          textAlign: "right"
        },
        width: 150,
        maxWidth: 150,
        minWidth: 150
      },
      {
        Header: "GP",
        accessor: "gp",
        style: {
          textAlign: "right"
        },
        width: 60,
        maxWidth: 60,
        minWidth: 60
      },
      {
        Header: "MIN",
        accessor: "mins",
        style: {
          textAlign: "right"
        },
        width: 60,
        maxWidth: 60,
        minWidth: 60
      },
      {
        Header: "FGM",
        accessor: "fgm",
        style: {
          textAlign: "right"
        },
        width: 60,
        maxWidth: 60,
        minWidth: 60
      },
      {
        Header: "FGA",
        accessor: "fga",
        style: {
          textAlign: "right"
        },
        width: 60,
        maxWidth: 60,
        minWidth: 60
      },
      {
        Header: "TPM",
        accessor: "tpm",
        style: {
          textAlign: "right"
        },
        width: 60,
        maxWidth: 60,
        minWidth: 60
      },
      {
        Header: "TPA",
        accessor: "tpa",
        style: {
          textAlign: "right"
        },
        width: 60,
        maxWidth: 60,
        minWidth: 60
      },
      {
        Header: "FTM",
        accessor: "ftm",
        style: {
          textAlign: "right"
        },
        width: 60,
        maxWidth: 60,
        minWidth: 60
      },
      {
        Header: "FTA",
        accessor: "fta",
        style: {
          textAlign: "right"
        },
        width: 60,
        maxWidth: 60,
        minWidth: 60
      },
      {
        Header: "OREB",
        accessor: "oreb",
        style: {
          textAlign: "right"
        },
        width: 60,
        maxWidth: 60,
        minWidth: 60
      },
      {
        Header: "DREB",
        accessor: "dreb",
        style: {
          textAlign: "right"
        },
        width: 60,
        maxWidth: 60,
        minWidth: 60
      },
      {
        Header: "AST",
        accessor: "ast",
        style: {
          textAlign: "right"
        },
        width: 60,
        maxWidth: 60,
        minWidth: 60
      },
      {
        Header: "TOV",
        accessor: "tov",
        style: {
          textAlign: "right"
        },
        width: 60,
        maxWidth: 60,
        minWidth: 60
      },
      {
        Header: "STL",
        accessor: "stl",
        style: {
          textAlign: "right"
        },
        width: 60,
        maxWidth: 60,
        minWidth: 60
      },
      {
        Header: "BLK",
        accessor: "blk",
        style: {
          textAlign: "right"
        },
        width: 60,
        maxWidth: 60,
        minWidth: 60
      },
      {
        Header: "PF",
        accessor: "pf",
        style: {
          textAlign: "right"
        },
        width: 60,
        maxWidth: 60,
        minWidth: 60
      },
      {
        Header: "Points",
        accessor: "points",
        style: {
          textAlign: "right"
        },
        width: 75,
        maxWidth: 75,
        minWidth: 75
      },
      {
        Header: "+/-",
        accessor: "plus_minus",
        style: {
          textAlign: "right"
        },
        width: 60,
        maxWidth: 60,
        minWidth: 60
      }
    ]
    if(!playerSelect.length)
      return null;
    console.log(this.state);
    return (
    <div>
      <InputForm teamOptions={teamSelect}  playerOptions={playerSelect} seasonOptions={seasonSelect} onClick={this.setNewPlayerData}/>
      {/*<Players players={data} />*/}
      <ReactTable columns={columns} data={this.state.data}></ReactTable>
    </div>
    )
  }
}
export default App;
