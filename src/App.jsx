import { useEffect, useState } from 'react';
import './App.css';
import AdminDashBoard from './Components/Admin/AdminDashBoard';
import ManagerDashBoard from './Components/Manager/ManagerDashBoard';
import UserDashBoard from './Components/User/UserDashBoard';

function App() {
  const [activeComponent, setActiveComponent] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
      fetch('http://127.0.0.1:5000/') // Fetch data from Flask backend
          .then((response) => response.json())
          .then((json) => setData(json.message))
          .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log(data); 


  function changeState(text){
      console.log('invoked'); 
      setActiveComponent(text);
  }


  
  return (
    <div className="App">
      {/* <FormSelection changeState={changeState} activeComponent={activeComponent} /> */} 
      {/* <AdminDashBoard /> */} 
      {/* <ManagerDashBoard /> */}
      {/* <UserDashBoard /> */}
    </div>
  );
}

export default App;
