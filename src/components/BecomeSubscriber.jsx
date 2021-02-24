import React, { Component } from "react";
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
} from "react-stripe-elements";
import axios from "axios";

class BecomeSubscriber extends Component {
  state = {
    renderForm: false,
  };

  payWithStripe = async (event) => {
    event.preventDefault();
    let stripeResponse = await this.props.stripe.createToken();
    stripeResponse.token && this.performPayment(stripeResponse.token.id);
  };

  performPayment = async (token) => {
    let authHeaders = JSON.parse(localStorage.getItem("credentials"));
    let response = await axios.post(
      "/subscriptions",
      {
        stripeToken: token,
      },
      {
        headers: authHeaders,
      }
    );
    if (response.data.paid) {
      this.setState({ message: response.data.message });
    }
  };

  render() {
    const { renderForm, message } = this.state;
    return (
      <div>
        {message ? (
          <p data-cy="payment-message">{message}</p>
        ) : (
          <>
            {renderForm ? (
              <form data-cy="payment-form" onSubmit={this.payWithStripe}>
                <div data-cy="card-number">
                  <label>Card Number</label>
                  <CardNumberElement />
                </div>
                <div data-cy="card-expiry">
                  <label>Card Expiry Date</label>
                  <CardExpiryElement />
                </div>
                <div data-cy="card-cvc">
                  <label>Card CVC</label>
                  <CardCVCElement />
                </div>
                <button type="submit" data-cy="submit-payment">
                  Submit Payment
                </button>
              </form>
            ) : (
              <button
                data-cy="become-subscriber"
                onClick={() => this.setState({ renderForm: true })}
              >
                Become Subscriber
              </button>
            )}
          </>
        )}
      </div>
    );
  }
}

export default injectStripe(BecomeSubscriber);
