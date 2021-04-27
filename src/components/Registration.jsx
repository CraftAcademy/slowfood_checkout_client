import React, { Component } from "react";

class Registration extends Component {
  state = {
    renderForm: false,
  };
  render() {
    const { renderForm } = this.state;
    return (
      <div>
        {renderForm ? (
          <form >
            <input
              type='email'
              name='email'
              data-cy='email-input'
              placeholder='Email'
            />
            <input
              type='password'
              name='password'
              data-cy='password-input'
              placeholder='Password'
            />
            <input
              type='password'
              name='password-confirmation'
              data-cy='password-confirmation-input'
              placeholder='Password Confirmation'
            />
            <button type="submit" data-cy='submit'>Register!</button>
          </form>
        ) : (
          <button
            data-cy='register'
            onClick={() => this.setState({ renderForm: true })}
          >
            Sign up!
          </button>
        )}
      </div>
    );
  }
}
export default Registration;
