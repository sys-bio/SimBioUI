import React, {Component} from 'react';
import DropdownWithPopup from './DropdownWithPopup';

import {createCpsModule} from './copasijs'
import {COPASI} from './copasi'

export class App extends Component  {
  
  componentDidMount() {
    this.loadCopasiAPI();
  };

  loadCopasiAPI = async () => {
    try {
      await createCpsModule().then(
        module => {
          const copasi = new COPASI(module);
          console.log('using COPASI', copasi.version);
          this.setState({copasi});
        }
      );

    } catch (err) {
      console.error(`Unexpected error in loadCopasiAPI. [Message: ${err.message}]`);
    }
  };

  render() {
    const initialOptions = { '[A]': true, '[B]': true, '[C]': true };
    const additionalElements = ['J_0', 'J_1', 'J_2'];
    
    return (
      <div className="App">
        <DropdownWithPopup initialOptions={initialOptions} additionalElements={additionalElements} />
        <div>{this.state?.copasi.version}</div>
      </div>
  )};
}

export default App;
