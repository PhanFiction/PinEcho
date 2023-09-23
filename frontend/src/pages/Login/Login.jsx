import React from 'react';
import './Login.css';

const Login = () => {
  return(
    <section className="login-section">
      <div className='overlay-text'></div>
      <form action="" className="login-form">
        <h1>Login</h1>
        <div>
          <label htmlFor="">Username</label>
          <input type="text" name="username" id="username"></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="text" name="password" id="password" />
        </div>
        <button className="submit_btn" type='submit'>Submit</button>
        <a href="#login">Don't have an account. Sign Up.</a>
      </form>
    </section>
  )
};

export default Login;