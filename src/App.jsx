import { useState } from 'react';
import './App.css';
import AdminSignup from './Components/AdminSignup';
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SingupForm'; // Fixed typo in import
import Button from './UI/Button';

function App() {
  const [activeComponent, setActiveComponent] = useState(null);
  let content = null; // Default content to null
  console.log(content);
  console.log(activeComponent);
  if (activeComponent) {
    if (activeComponent === 'login') {
      content = <LoginForm />; // Fixed component name
    } else if (activeComponent === 'adminSignup') {
      content = <AdminSignup />;
    } else if (activeComponent === 'userSignup') {
      content = <SignupForm />; // Fixed component name
    }
  }

  return (
    <div className="App">
      <div className="button-container">
        <Button className='sample' onSubmit={() => setActiveComponent('adminSignup')}>
          Admin Signup Form
        </Button>
        <Button className='sample' onSubmit={() => setActiveComponent('userSignup')}>
          User Signup Form
        </Button>
        <Button className='sample' onSubmit={() => setActiveComponent('login')}>
          Login Form
        </Button>
      </div>
      <div className="form-container">
        {content || <p>Please select a form to display.</p>} 
      </div>
    </div>
  );
}

export default App;
