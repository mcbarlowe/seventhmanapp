import React, { Component } from 'react';
import './css/input_form.css'

class InputForm extends Component {

  render() {
    return (
      <form>
        <div class="formColumn">
          <div class="formRow">
            <div class="formItem">
              <label class="formLabels">
                Season:
              </label>
            </div>
            <div class="formItem">
              <input class="inputBox" type="text" name="inputBox" value="Season" />
            </div>
            <div class="formItem">
              <label class="formLabels">
                Player:
              </label>
            </div>
            <div class="formItem">
            <input class="inputBox" type="text" name="inputBox" value="Player" />
            </div>
          </div>
          <div class="formRow">
            <div class="formItem">
              <label class="formLabels">
                Team:
              </label>
            </div>
            <div class="formItem">
              <input class="inputBox" type="text" name="inputBox" value="Team" />
            </div>
            <div class="formItem">
              <label class="formLabels">
                Min TOC:
              </label>
            </div>
            <div class="formItem">
              <input class="inputBox" type="text" name="inputBox" value="Min TOC" />
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default InputForm
