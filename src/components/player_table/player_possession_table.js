import React, { Component } from 'react';
import PlayerPossessionInputForm from './player_possession_input_form';
import ReactTable from 'react-table';
import {CSVLink} from 'react-csv';
import '../../../node_modules/react-table/react-table.css';
import { columns } from './player_possession_table_columns';

class PlayerPossessionTable extends Component {

  constructor(props) {
    super();
      this.state = {
        data: []
      };
  }


  setNewPlayerData = data => {
    this.setState({ data: data });
  }

  componentDidMount() {
    fetch('https://stats.theseventhman.net/stats/api/v1/players/possession/?&season=2019&player=&toc=&team=&agg=no', { method: 'get', mode: 'cors' })
    .then(res => res.json())
    .then((data) => {
      this.setState({ data: data })
    })
    .catch(console.log);
  }
  render() {
    const pStyle = {"padding-left": "20px", width: "60%"}
    const prettyLink = {
      border:'none',
      outline:'none',
      color:'inherit',
      textDecoration: 'none'
    }

    return (
          <div>
            <div className="input-form">
              <PlayerPossessionInputForm
                teamOptions={this.props.teamSelect}
                playerOptions={this.props.playerSelect}
                seasonOptions={this.props.seasonSelect} onClick={this.setNewPlayerData}/>
              <button className="myButton"><CSVLink data={this.state.data} style={prettyLink} filename="nba_data.csv">Export Data to CSV</CSVLink></button>
            </div>
            <p style={pStyle}> These stats are calculated per 100 possesions</p>
            <div className="player-table">
              <ReactTable
                columns={columns}
                data={this.state.data}
                noDataText={"No Data Matched Your Criteria"}
                resizable={false}
                minRows={5}
                defaultPageSize={50}></ReactTable>
            </div>
          </div>
    )
  }
}

export default PlayerPossessionTable
