import React, { Component } from "react";
import axios from "axios";

class Registration extends Component {
  state = {
    renderForm: false,
  };

  registerUser = async (event) => {
    event.preventDefault();
    let credentials = {
      email: event.target.email.value,
      password: event.target.password.value,
      password_confirmation: event.target.passwordConfirmation.value,
    };
    try {
      let response = await axios.post("/auth", credentials);
      debugger
      const userCredentials = {
        uid: response.headers["uid"],
        client: response.headers["client"],
        access_token: response.headers["access-token"],
        expiry: response.headers["expiry"],
        token_type: "Bearer",
      };

      localStorage.setItem("userData", JSON.stringify(userCredentials));
      this.setState({
        message: `Congratulations ${response.data.data.email}, now you can order Pizza!`,
        renderForm: false,
      });
      this.props.authStatus()
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { renderForm, message } = this.state;
    return (
      <div>
        {renderForm ? (
          <form onSubmit={(event) => this.registerUser(event)}>
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
              name='passwordConfirmation'
              data-cy='password-confirmation-input'
              placeholder='Password Confirmation'
            />
            <button type='submit' data-cy='submit'>
              Register!
            </button>
          </form>
        ) : message ? (
          <div data-cy='success-message'>{message}</div>
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
