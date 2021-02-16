import React, { Component } from "react";
import { registerUser } from "../modules/authenticationService";

class Registration extends Component {
  state = {
    renderForm: false,
  };

  signUpUser = async (event) => {
    event.preventDefault();
    let credentials = {
      email: event.target.email.value,
      password: event.target.password.value,
      password_confirmation: event.target.password_confirmation.value,
    };
    let response = await registerUser(credentials);
    if (response.email) {
      this.setState({
        message: `Hope you will enjoy your order ${response.email}`,
      });
      this.props.authenticatedStatus();
      this.setState({ renderForm: false });
    } else {
      this.setState({
        errorMessage: `Whoops! ${response}`,
      });
    }
  };
  
  render() {
    const { renderForm, message, errorMessage } = this.state;
    return (
      <div>
        {renderForm ? (
          <>
            <form
              onSubmit={(event) => {
                this.signUpUser(event);
              }}
            >
              <input
                name="email"
                type="email"
                data-cy="email-field"
                placeholder="Email"
              />
              <input
                name="password"
                type="password"
                data-cy="password-field"
                placeholder="Password"
              />
              <input
                name="password_confirmation"
                type="password"
                data-cy="password-confirmation-field"
                placeholder="Password Confirmation"
              />
              <button type="submit" data-cy="submit">
                Register!
              </button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
          </>
        ) : message ? (
          <div>{message}</div>
        ) : (
          <button
            data-cy="register-button"
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
