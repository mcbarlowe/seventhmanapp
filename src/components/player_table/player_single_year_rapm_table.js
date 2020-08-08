import React, { Component } from 'react';
import PlayerRapmInputForm from './player_single_year_rapm_input_form';
import ReactTable from 'react-table';
import {CSVLink} from 'react-csv';
import '../../../node_modules/react-table/react-table.css';
import { columns } from './player_single_year_rapm_columns';

class PlayerRapmTable extends Component {

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
    fetch('https://stats.theseventhman.net/stats/api/v2/players/rapm/?&season=2020&player=', { method: 'get', mode: 'cors' })
    .then(res => res.json())
    .then((data) => {
      this.setState({ data: data })
    })
    .catch(console.log);
  }
  render() {
    const prettyLink = {
      border:'none',
      outline:'none',
      color:'inherit',
      textDecoration: 'none'
    }

    return (
          <div>
            <div className="input-form">
              <PlayerRapmInputForm
                playerOptions={this.props.playerSelect}
                seasonOptions={this.props.seasonSelect} onClick={this.setNewPlayerData}/>
              <button className="myButton"><CSVLink data={this.state.data} style={prettyLink} filename="nba_data.csv">Export Data to CSV</CSVLink></button>
            </div>
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

export default PlayerRapmTable
