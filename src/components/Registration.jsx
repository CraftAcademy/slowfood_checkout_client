import React, { Component } from "react";
import { Form } from "semantic-ui-react";

class Registration extends Component {
  state = {
    renderForm: false,
  };

  signUpUser = () => {
    debugger
  }
  render() {
    const { renderForm } = this.state;
    return (
      <div>
        {renderForm ? (
          <form onSubmit={(event) => {this.signUpUser(event)}}>
            <input type="email" data-cy="email-field" placeholder="Email" />
            <input
              type="password"
              data-cy="password-field"
              placeholder="Password"
            />
            <input
              type="password"
              data-cy="password-confirmation-field"
              placeholder="Password Confirmation"
            />
            <button type="submit" data-cy='submit'>Register!</button>
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
