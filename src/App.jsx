import React, { Component } from "react";
import DisplayMenu from "./components/DisplayMenu";
import { Header, Container } from "semantic-ui-react";
import Registration from "./components/Registration";

class App extends Component {
  state = {
    authenticated: false
  }

  setAuthState = () => {
    this.setState({authenticated: true})
  }
  render() {
    return (
      <>
        <Header as="h1" textAlign="center">
          Slowfood
        </Header>
        <Container>
          <Registration authenticatedStatus={() => this.setAuthState()}/>
          <DisplayMenu authenticated={this.state.authenticated} />
        </Container>
      </>
    );
  }
}

export default App;
