import React, { Component } from 'react';

class InputForm extends Component {

  render() {
    return (
      <form>
        <label>
          Season:
        </label>
        <input type="text" name="inputBox" value="test" />
      </form>
    )
  }
}

export default InputForm
