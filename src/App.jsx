import { useState } from 'react';
import './App.css';
import AdminDashBoard from './Components/Admin/AdminDashBoard';
import ManagerDashBoard from './Components/Manager/ManagerDashBoard';
import UserDashBoard from './Components/User/UserDashBoard';

function App() {
  const [activeComponent, setActiveComponent] = useState(null);
  function changeState(text){
      console.log('invoked'); 
      setActiveComponent(text);
  }


  
  return (
    <div className="App">
      {/* <FormSelection changeState={changeState} activeComponent={activeComponent} /> */} 
      {/* <AdminDashBoard /> */} 
      {/* <ManagerDashBoard /> */}
      <UserDashBoard />
    </div>
  );
}

export default App;
