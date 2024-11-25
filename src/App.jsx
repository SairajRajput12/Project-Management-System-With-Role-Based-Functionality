import { useState } from 'react';
import './App.css';
import AdminDashBoard from './Components/Admin/AdminDashBoard';

function App() {
  const [activeComponent, setActiveComponent] = useState(null);
  function changeState(text){
      console.log('invoked'); 
      setActiveComponent(text);
  }


  
  return (
    <div className="App">
      {/* <FormSelection changeState={changeState} activeComponent={activeComponent} /> */} 
      <AdminDashBoard />
    </div>
  );
}

export default App;
