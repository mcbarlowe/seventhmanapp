import React, { Component } from 'react';
import TeamRapmInputForm from './team_single_year_rapm_input_form';
import ReactTable from 'react-table';
import {CSVLink} from 'react-csv';
import '../../../node_modules/react-table/react-table.css';
import { columns } from './team_single_year_rapm_columns';

class TeamRapmTable extends Component {
  constructor(props) {
    super();
      this.state = {
        data: []
      };
  }

  setNewTeamData = data => {
    this.setState({ data: data });
    console.log(this.state);
  }

  componentDidMount() {
    fetch('https://stats.theseventhman.net/stats/api/v1/teams/rapm/?&season=2019&team=', { method: 'get', mode: 'cors' })
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
                <TeamRapmInputForm
                  teamOptions={this.props.teamSelect}
                  seasonOptions={this.props.seasonSelect} onClick={this.setNewTeamData}/>
                <button className="myButton"><CSVLink data={this.state.data} style={prettyLink} filename="nba_data.csv">Export Data to CSV</CSVLink></button>
              </div>
              <div className="player-table">
                <ReactTable
                  columns={columns}
                  data={this.state.data}
                  noDataText={"No Data Matched Your Criteria"}
                  resizable={false}
                  defaultPageSize={30}></ReactTable>
              </div>
            </div>
    )
  }
}

export default TeamRapmTable
