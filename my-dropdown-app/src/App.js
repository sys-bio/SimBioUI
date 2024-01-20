import React from 'react';
import DropdownWithPopup from './DropdownWithPopup';

function App() {
  const initialOptions = { '[A]': true, '[B]': true, '[C]': true };
  const additionalElements = ['J_0', 'J_1', 'J_2'];

  return (
      <div className="App">
        <DropdownWithPopup initialOptions={initialOptions} additionalElements={additionalElements} />
      </div>
  );
}

export default App;
