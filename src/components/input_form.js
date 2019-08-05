import React, { Component } from 'react';
import './css/input_form.css'
import Select from 'react-select'

class InputForm extends Component {
  constructor(props) {
    super();
      this.state = {
        season: '',
        player: '',
        team: '',
        toc: '',
      };
    this.onClick = this.onSubmit.bind(this)
  }


  handleChangeSeason = season => {
    this.setState({ season });
  };
  handleChangePlayer = player => {
    this.setState({ player });
  };
  handleChangeTeam = team => {
    this.setState({ team });
  };

  onSubmit = event => {
    event.preventDefault();
    let result = fetch('http://0.0.0.0:5000/stats/api/v1/players/test', { method: 'get', mode: 'cors' })
    .then(res => res.json())
    .then((results) => {this.props.onClick(results)} )
    console.log(result);
  }

  render() {
    const players_arr = [...new Set(this.props.selectOptions.map( item => item.player_name))];
    const season_arr = [...new Set(this.props.selectOptions.map( item => item.season))];
    const team_arr = [...new Set(this.props.selectOptions.map( item => item.teams))];
    const seasons = season_arr.map( season => ({value: String(season), label: String(season)}) );
    const teams = team_arr.map( team => ({value: String(team), label: String(team)}) );
    const players = players_arr.map( player => ({value: player, label: player}) );
    return (
      <form onSubmit={this.onSubmit}>
        <div className="formColumn">
          <div className="formRow">
            <div className="formItem">
              <label className="formLabels">
                Season:
              </label>
              <Select isMulti options={seasons} value={this.state.season} onChange={this.handleChangeSeason}/>
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
            <div className="formItem">
              <label className="formLabels">
                Min TOC:
              </label>
              <input type="text" className="tocInputBox" />
            </div>
          </div>
        </div>
        <button onClick={this.onSubmit}>Submit</button>
      </form>
    )
  }
}

export default InputForm
