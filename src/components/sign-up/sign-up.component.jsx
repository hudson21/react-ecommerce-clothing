import React, { useState } from 'react';
import './sign-up.styles.scss';

// Redux
import { connect } from 'react-redux';

// Components
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// Actions
import { signUpStart } from '../../redux/user/user.actions';


const SignUp = ({ signUpStart }) => {
  const [userCrendentials, setUserCredentials] = useState({
    displayName: '',
    email: '', 
    password: '',
    confirmPassword: '',
  });
  const { displayName, email, password, confirmPassword } = userCrendentials;

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords dont match');
      return;
    }

    signUpStart({ displayName, email, password });
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCredentials({...userCrendentials, [name]: value});
  }
  return(
    <div className='sign-up'>
      <h2 className='title'>I do not have an account</h2>
      <span>Sign up with your email and password</span>

      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          handleChange={handleChange}
          label='Display Name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          handleChange={handleChange}
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          handleChange={handleChange}
          label='Password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          handleChange={handleChange}
          label='Confirm Password'
          required
        />
        <CustomButton type='submit'>SIGN UP</CustomButton>
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);