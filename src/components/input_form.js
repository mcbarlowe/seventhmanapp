import React, { Component } from 'react';
import './css/input_form.css'
import Select from 'react-select'

class InputForm extends Component {
  constructor(props) {
    super();
      this.state = {
        season: [],
        player: [],
        team: [],
        toc: ''
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
  handleChangeToc = toc => {
    this.setState({ toc: toc.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    let result_url ='http://0.0.0.0:5000/stats/api/v1/players/submittest/';
    let test_url = 'http://0.0.0.0:5000/stats/api/v1/players/submittest/' ;
    if (this.state.player.length > 0) {
      for (let i = 0; i < this.state.player.length; i++) {
        if (i == this.state.player.length - 1 && i != 0) {
          result_url = result_url + this.state.player[i]['value'];
        } else if (i == 0 && this.state.player.length != 1) {
          result_url = result_url + '?player=' + this.state.player[i]['value'] + '+';
        } else if (i == 0 && this.state.player.length == 1) {
          result_url = result_url + '?player=' + this.state.player[i]['value'];
        } else {
          result_url = result_url + this.state.player[i]['value'] + '+';
        }
      }
    }

    if (this.state.season.length > 0) {
      console.log(this.state.season.length == 0);
      for (let i = 0; i < this.state.season.length; i++) {
        if (i == this.state.season.length - 1 && i != 0) {
          result_url = result_url + this.state.season[i]['value'];
        } else if (i == 0 && this.state.season.length != 1) {
          result_url = result_url + '&season=' + this.state.season[i]['value'] + '+';
        } else if (i == 0 && this.state.season.length == 1) {
          result_url = result_url + '&season=' + this.state.season[i]['value'];
        } else {
          result_url = result_url + this.state.season[i]['value'] + '+';
        }
      }
    }
    if (this.state.team.length > 0) {
      for (let i = 0; i < this.state.team.length; i++) {
        console.log(i == 0);
        if (i == this.state.team.length - 1 && i != 0) {
          result_url = result_url + this.state.team[i]['value'];
        } else if (i == 0 && this.state.team.length != 1) {
          result_url = result_url + '&team=' + this.state.team[i]['value'] + '+';
        } else if (i == 0 && this.state.team.length == 1) {
          result_url = result_url + '&team=' + this.state.team[i]['value'];
        } else {
          result_url = result_url + this.state.team[i]['value'] + '+';
        }
      }
    }
    if (this.state.toc != '') {
      result_url = result_url + '&toc=' + this.state.toc;
    }
      let result = fetch(result_url, { method: 'get', mode: 'cors' })
      .then(res => res.json())
      .then((results) => {this.props.onClick(results)} )
      console.log(result_url);
      console.log(this.state);
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
              <input type="text" className="tocInputBox" onChange={this.handleChangeToc}/>
            </div>
          </div>
        </div>
        <button onClick={this.onSubmit}>Submit</button>
      </form>
    )
  }
}

export default InputForm
