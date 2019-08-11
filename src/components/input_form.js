import React, { Component } from 'react';
import './css/input_form.css'
import Select from 'react-select'

class InputForm extends Component {
  constructor(props) {
    super();
      this.state = {
        season: [],
        player: '',
        team: [],
        toc: [],
      };
    this.onClick = this.onSubmit.bind(this)
  }

  createUrlString = array => {
    if (array.length > 0) {
      return array.join('+');
    } else if (array.length == 0) {
      return array[0];
    } else {
      return '';
    }
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
    let result_url ='http://0.0.0.0:5000/stats/api/v1/players/submittest/?player=';
    let test_url = 'http://0.0.0.0:5000/stats/api/v1/players/submittest/?player='
    if (this.state.player.length > 0) {
      for (let i = 0; i < this.state.player.length; i++) {
        console.log(i);
        console.log(this.state.player.length);
        if (i == this.state.player.length - 1) {
          result_url = result_url + this.state.player[i]['value']
        } else {
          result_url = result_url + this.state.player[i]['value'] + '+'
        }
      }

      let result = fetch(result_url, { method: 'get', mode: 'cors' })
      .then(res => res.json())
      .then((results) => {this.props.onClick(results)} )
      console.log(result_url);
    }
  }

  render() {
    const season_arr = this.props.seasonOptions;
    const team_arr = this.props.teamOptions;
    const player_arr = this.props.playerOptions;
    const seasons = season_arr.map( season => ({value: String(season.season), label: String(season.season)}) );
    const teams = team_arr.map( team => ({value: String(team.team_id), label: String(team.abbreviation)}) );
    const players = player_arr.map( player => ({value: player.player_id, label: player.player_name}) );
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
