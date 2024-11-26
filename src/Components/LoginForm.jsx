import React, { useState } from 'react'
import Form from '../UI/Form';
import '../Components/SignupForm.css';
import Button from '../UI/Button';


export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  const SubmitForm = async (e) => {
        e.preventDefault()
        console.log('Submit Form Function invoked'); 
        try{
            const response = await fetch('http://127.0.0.1:5000/login',{
              method:'POST', 
              headers:{'Content-Type':'application/json'}, 
              body:JSON.stringify({username:email,password:password})
            });

            const result = await response.json(); 
            setMessage(result.message); 
            if(response.ok){
              console.log('login succesfull !'); 
            }
            else{
              console.log(result.message);
            }
        }catch(error){
          console.error('Error:', error);
        }
  }


  return (
    <>
    <div className='signup-container'>
    <h1>Login Form</h1>
    <Form className='signup' onSubmit={SubmitForm}>
        <label>Enter your password</label> 
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Enter your mail</label> 
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button onSubmit={SubmitForm} className='submit-button'>Login</Button>
    </Form>
    {message && <p>{message}</p>}
    </div>
  </>
  )
}
