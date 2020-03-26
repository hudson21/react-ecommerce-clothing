import React, { Component } from 'react';

import './sign-in.styles.scss';

// Components
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

class SingIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '', 
      password: '',
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ 
      email: '',
      password: '',
    });
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, password } = this.state;

    return(
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput 
            name="email" 
            type="email"
            value={email}
            handleChange={this.handleChange} 
            label='email'
            required
          />
          <FormInput 
            name="password" 
            type="password" 
            value={password} 
            handleChange={this.handleChange}
            label='password'
            required
          />
          <CustomButton type="submit">Sign In</CustomButton>
        </form>
      </div>
    );
  }
}

export default SingIn;
