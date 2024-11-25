import { useState } from 'react';
import './App.css';
import DashBoard from './UI/DashBoard';

function App() {
  const [activeComponent, setActiveComponent] = useState(null);
  function changeState(text){
      console.log('invoked'); 
      setActiveComponent(text);
  }


  
  return (
    <div className="App">
      {/* <FormSelection changeState={changeState} activeComponent={activeComponent} /> */} 
      <DashBoard />
    </div>
  );
}

export default App;
