

const SignUp = () => {
  return (
    <section className="signup-section">
      <div className='overlay-text'></div>
      <form action="" className="login-form">
        <h1>Sign Up</h1>
        <div>
          <label htmlFor="">Username</label>
          <input type="text" name="username" id="username"></input>
        </div>
        <div>
          <label htmlFor="">Fullname</label>
          <input type="text" name="fullname" id="fullname" />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input type="text" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="text" name="password" id="password" />
        </div>
        <button className="submit_btn" type='submit'>Submit</button>
        <a href="#login">Already have an account. Login Now.</a>
      </form>
    </section>
  )
};

export default SignUp;