import React, { Component } from 'react';
import PossInputForm from './team_possession_input_form';
import ReactTable from 'react-table';
import {CSVLink} from 'react-csv';
import '../../../node_modules/react-table/react-table.css';
import { columns } from './team_possession_table_columns';

class TeamPossessionTable extends Component {
  constructor(props) {
    super();
      this.state = {
        data: []
      };
  }

  setNewTeamData = data => {
    this.setState({ data: data });
  }

  componentDidMount() {
    fetch('https://stats.theseventhman.net/stats/api/v1/teams/possession/?&season=2020&team=&agg=no', { method: 'get', mode: 'cors' })
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
                <PossInputForm
                  teamOptions={this.props.teamSelect}
                  seasonOptions={this.props.seasonSelect} onClick={this.setNewTeamData}/>
                <button className="myButton"><CSVLink data={this.state.data} style={prettyLink} filename="nba_data.csv">Export Data to CSV</CSVLink></button>
              </div>
              <p style={pStyle}> These stats are calculated per 100 possesions</p>
              <div className="team-poss-table">
              <ReactTable
                columns={columns}
                data={this.state.data}
                resizable={false}
                defaultSortDesc={true}
                noDataText={"No Data Matched Your Criteria"}
                defaultPageSize={30}></ReactTable>
              </div>
            </div>
    )
  }
}

export default TeamPossessionTable
