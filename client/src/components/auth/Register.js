import React, { Fragment } from 'react';

const Register = () => {
  return (
    <Fragment>
      <h1 class='large text-primary'>Sign Up</h1>
      <p class='lead'>
        <i class='fas fa-user'></i> Create Your Account
      </p>
      <form action='dashboard.html' class='form'>
        <div class='form-group'>
          <input type='text' placeholder='Name' />
        </div>
        <div class='form-group'>
          <input type='email' placeholder='Email Address' />
          <small class='form-text'>
            This site uses Gravatar, so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div class='form-group'>
          <input type='password' placeholder='Password' />
        </div>
        <div class='form-group'>
          <input type='password' placeholder='Confirm Password' />
        </div>
        <input type='submit' value='Register' class='btn btn-primary' />
      </form>
      <p class='my-1'>
        Already have an account? <a href='login.html'>Sign in</a>
      </p>
    </Fragment>
  );
};

export default Register;
