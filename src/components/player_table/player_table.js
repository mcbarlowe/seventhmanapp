import React, { Component } from 'react';
import InputForm from './input_form';
import ReactTable from 'react-table';
import {CSVLink} from 'react-csv';
import '../../../node_modules/react-table/react-table.css';
import { columns } from './player_table_columns';

class PlayerTable extends Component {
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
    fetch('https://stats.theseventhman.net/stats/api/v1/players/?&season=2019&player=&toc=&team=&agg=no', { method: 'get', mode: 'cors' })
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
    {/*this is for if the data is null its doesn't return a bajillion rows*/}
    let pageSize = 50;
    if (this.state.data.length === 0) {
      pageSize = 10
    }
    return (
            <div>
              <InputForm
                teamOptions={this.props.teamSelect}
                playerOptions={this.props.playerSelect}
                seasonOptions={this.props.seasonSelect} onClick={this.setNewPlayerData}/>
              <button className="myButton"><CSVLink data={this.state.data} style={prettyLink} filename="nba_data.csv">Export Data to CSV</CSVLink></button>
              <ReactTable
                columns={columns}
                data={this.state.data}
                noDataText={"No Data Matched Your Criteria"}
                defaultPageSize={pageSize}></ReactTable>
            </div>
    )
  }
}

export default PlayerTable
