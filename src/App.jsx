import { useState } from 'react';
import './App.css';
import AdminSignup from './Components/AdminSignup';
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SingupForm'; // Fixed typo in import
import FormSelection from './Components/FormSelection';

function App() {
  const [activeComponent, setActiveComponent] = useState(null);
  

  function changeState(text){
      console.log('invoked'); 
      setActiveComponent(text);
  }

  return (
    <div className="App">
      <FormSelection changeState={changeState} activeComponent={activeComponent} />
    </div>
  );
}

export default App;
