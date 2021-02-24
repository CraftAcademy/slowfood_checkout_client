import React, { Component } from "react";
import DisplayMenu from "./components/DisplayMenu";
import { Header, Container } from "semantic-ui-react";
import Registration from "./components/Registration";
import BecomeSubscriber from "./components/BecomeSubscriber";
import { Elements } from "react-stripe-elements";

class App extends Component {
  state = {
    authenticated: false,
  };

  setAuthState = () => {
    this.setState({ authenticated: true });
  };
  render() {
    const { authenticated } = this.state;
    return (
      <>
        <Header as="h1" textAlign="center">
          Slowfood
        </Header>
        <Container>
          {authenticated ? (
            <Elements>
              <BecomeSubscriber />
            </Elements>
          ) : (
            <Registration authenticatedStatus={() => this.setAuthState()} />
          )}

          <DisplayMenu authenticated={this.state.authenticated} />
        </Container>
      </>
    );
  }
}

export default App;
