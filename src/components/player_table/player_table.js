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
    console.log(this.state);
  }

  componentDidMount() {
    fetch('http://0.0.0.0:5000/stats/api/v1/players/all/', { method: 'get', mode: 'cors' })
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
              <InputForm
                teamOptions={this.props.teamSelect}
                playerOptions={this.props.playerSelect}
                seasonOptions={this.props.seasonSelect} onClick={this.setNewPlayerData}/>
              <button className="myButton"><CSVLink data={this.state.data} style={prettyLink} filename="nba_data.csv">Export Data to CSV</CSVLink></button>
              <ReactTable
                columns={columns}
                data={this.state.data}
                noDataText={"No Data Matched Your Criteria"}
                defaultPageSize={50}></ReactTable>
            </div>
    )
  }
}

export default PlayerTable