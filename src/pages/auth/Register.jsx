import React, { useState } from 'react'
import './auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { UseData } from '../../context/UserContext';


const Register = () => {
  const navigate = useNavigate();
  const { btnloading, registerUser } = UseData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
      e.preventDefault();
      await registerUser(name,email, password, navigate);
  }
  return (
    <div className="auth-page">
    <div className="auth-form">
        <h2>Register</h2>
        <form onSubmit={submitHandler}>
            
        <label htmlFor='name'>Name</label>
          <input type='name'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required />
            <label htmlFor='email'>Email</label>
          <input type='email'
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
            required />
        
                  
            
                  <label htmlFor='password'>Password</label>
          <input type='password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required />      
            
          <button disabled={btnloading} type='submit' className='common-btn'>
            { btnloading?"Please Wait...":"Register"}</button>
        </form>

        <p>
             Have an account<Link to='/login'> ?Login</Link>
        </p>
    </div>
</div>
  )
}

export default Register