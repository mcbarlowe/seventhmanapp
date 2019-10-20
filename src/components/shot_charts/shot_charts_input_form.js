import React, { Component } from 'react';
import '../css/input_form.css'
import Select from 'react-select'

class ShotChartsInputForm extends Component {
  constructor(props) {
    super();
      this.state = {
        season: [{label: '2019', value: '2019'}],
        player: [{label: 'Stephen Curry', value: '201939'}],
        team: [],
      };
  }

  handleChangeSeason = season => {
    if (season === null) {
      this.setState({season: []});
    }
    else{
    this.setState({ season });
    }
  };
  handleChangePlayer = player => {
    if (player === null) {
      this.setState({player: []});
    }
    else{
    this.setState({ player });
    }
  };
  handleChangeTeam = team => {
    if (team === null) {
      this.setState({team: []});
    }
    else{
    this.setState({ team });
    }
  };


  onSubmit = event => {
    event.preventDefault();
    let result_url ='https://stats.theseventhman.net/stats/api/v1/players/shots/?';
    result_url = result_url + '&player=' + this.state.player.map(player => (player.value)).join('+');
    result_url = result_url + '&season=' + this.state.season.map(season => (season.value)).join('+');
    result_url = result_url + '&team=' + this.state.team.map(team => (team.value)).join('+');
    fetch(result_url, { method: 'get', mode: 'cors' })
      .then(res => res.json())
      .then((results) => {this.props.onClick(results)} );
    console.log(result_url);

  }

  render() {
    const season_arr = this.props.seasonOptions;
    const team_arr = this.props.teamOptions;
    const player_arr = this.props.playerOptions;
    const seasons = season_arr.map( season => ({value: String(season.season), label: String(season.season)}) );
    const teams = team_arr.map( team => ({value: String(team.team_id), label: String(team.abbreviation)}) );
    const players = player_arr.map( player => ({value: player.player_id, label: player.player_name}) );
    return (
      <form className = "playerForm" onSubmit={this.onSubmit}>
        <div className="formColumn">
          <div className="formRow">
            <div className="formItem">
              <label className="formLabels">
                Season:
              </label>
              <Select isMulti defaulValue={this.state.season} options={seasons} value={this.state.season} onChange={this.handleChangeSeason}/>
            </div>
            <div className="formItem">
              <label className="formLabels">
                Player:
              </label>
              <Select isMulti options={players} value={this.state.player} onChange={this.handleChangePlayer}/>
            </div>
            <div className="formItem">
              <label className="formLabels">
                Team:
              </label>
                <Select isMulti options={teams} value={this.state.team} onChange={this.handleChangeTeam}/>
            </div>
          </div>
        </div>
      {/* TODO: style this button*/}
        <button className="myButton" onClick={this.onSubmit}>Submit</button>
      </form>
    )
  }
}

export default ShotChartsInputForm
