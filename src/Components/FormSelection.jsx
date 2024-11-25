import React from 'react';
import Button from '../UI/Button';
import AdminSignup from './AdminSignup';
import LoginForm from './LoginForm';
import SingupForm from './SingupForm';

function FormSelection({ changeState,activeComponent }) {
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
      <div className="button-container">
        <Button className='sample' onSubmit={() => changeState('adminSignup')}>
          Admin Signup Form
        </Button>
        <Button className='sample' onSubmit={() => changeState('userSignup')}>
          User Signup Form
        </Button>
        <Button className='sample' onSubmit={() => changeState('login')}>
          Login Form
        </Button>
      </div>
      <div className="form-container">
        {content || <p>Please select a form to display.</p>}
      </div>
    </div>
  );
}

export default FormSelection;
