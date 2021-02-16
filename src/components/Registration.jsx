import React, { Component } from "react";
import axios from "axios";

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
    let response = await axios.post("/auth", credentials);
    const userCredentials = {
      uid: response.headers["uid"],
      client: response.headers["client"],
      access_token: response.headers["access-token"],
      expiry: response.headers["expiry"],
      token_type: "Bearer",
    };
    localStorage.setItem("credentials", JSON.stringify(userCredentials));
    this.props.authenticatedStatus()
    this.setState({renderForm: false})
  };
  render() {
    const { renderForm } = this.state;
    return (
      <div>
        {renderForm ? (
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
