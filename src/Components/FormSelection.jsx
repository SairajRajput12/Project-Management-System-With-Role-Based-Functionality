import React, { useState } from 'react';
import Button from '../UI/Button';
import AdminSignup from './AdminSignup';
import LoginForm from './LoginForm';
import SingupForm from './SingupForm';

function FormSelection() {
    const [activeComponent,changeState] = useState('login')
    let content = null; // Default content to null
    console.log(content);
    if (activeComponent) {
      if (activeComponent === 'login') {
        content = <LoginForm />; // Fixed component name
      } else if (activeComponent === 'adminSignup') {
        content = <AdminSignup />;
      } else if (activeComponent === 'userSignup') {
        content = <SingupForm />; // Fixed component name
      }
    }

  return (
    <div>
      {content === null && <div className="button-container">
        <Button className='sample' onSubmit={() => changeState('adminSignup')}>
          Admin Signup Form
        </Button>
        <Button className='sample' onSubmit={() => changeState('userSignup')}>
          User Signup Form
        </Button>
        <Button className='sample' onSubmit={() => changeState('login')}>
          Login Form
        </Button>
      </div>}
      <div className="form-container">
        {content || <p>Select on which mode you will prefer to work with us.</p>}
      </div>
    </div>
  );
}

export default FormSelection;
