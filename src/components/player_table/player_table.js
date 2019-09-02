import React, { Component } from 'react';
import InputForm from './input_form';
import ReactTable from 'react-table';
import {CSVLink, CSVDownload} from 'react-csv';
import '../../../node_modules/react-table/react-table.css';

class PlayerTable extends Component {
  constructor(props) {
    super();
      this.state = {
        season: [{label: '2019', value: '2019'}],
        player: [],
        team: [],
        toc: '',
        agg: 'no'
      };
  }

  setNewPlayerData = data => {
    this.setState({ data: data });
    console.log(this.state);
  }
  render() {
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
        width: 125,
        maxWidth: 125,
        minWidth: 125
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
                seasonOptions={this.props.seasonSelect} onClick={this.props.onClick}/>
              <button className="myButton"><CSVLink data={this.props.data} style={prettyLink} filename="nba_data.csv">Export Data to CSV</CSVLink></button>
              <ReactTable
                columns={columns}
                data={this.props.data}
                noDataText={"No Data Matched Your Criteria"}
                defaultPageSize={50}></ReactTable>
            </div>
    )
  }
}

export default PlayerTable
