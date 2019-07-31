import React, { Component } from 'react';
import './css/input_form.css'
import Select from 'react-select'

class InputForm extends Component {

  render() {
    const players_arr = [...new Set(this.props.selectOptions.map( item => item.player_name))];
    const season_arr = [...new Set(this.props.selectOptions.map( item => item.season))];
    const team_arr = [...new Set(this.props.selectOptions.map( item => item.teams))];
    const seasons = season_arr.map( season => ({value: String(season), label: String(season)}) );
    const teams = team_arr.map( team => ({value: String(team), label: String(team)}) );
    const players = players_arr.map( player => ({value: player, label: player}) );
    console.log(teams);
    return (
      <form>
        <div class="formColumn">
          <div class="formRow">
            <div class="formItem">
              <label class="formLabels">
                Season:
              </label>
              <Select isMulti options={seasons} />
            </div>
            <div class="formItem">
              <label class="formLabels">
                Player:
              </label>
              <Select isMulti options={players} />
            </div>
            <div class="formItem">
              <label class="formLabels">
                Team:
              </label>
                <Select isMulti options={teams} />
            </div>
            <div class="formItem">
              <label class="formLabels">
                Min TOC:
              </label>
              <input type="text" class="tocInputBox" />
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default InputForm
