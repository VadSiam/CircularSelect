import React from 'react';
import './App.css';
import CircularSelect, { IOption } from './components/CircularSelect';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
];

const radius = 100;
const xCorrection = -20;
const yCorrection = -15;

function App() {
  const handleCircularSelectChange = (option: IOption) => {
    console.log("Selected option:", option);
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>CircularSelect Example</h1>
        <CircularSelect
          options={options}
          defaultOption={options[0]}
          onChange={handleCircularSelectChange}
          circleOptionsStyles={{
            radius,
            xCorrection,
            yCorrection,
          }}
          wrapperStyles={{}}
          mainButtonStyles={{}}
          optionsStyles={{}}
          optionStyles={{}}

        />
      </header>
    </div>
  );
}

export default App;
