import React from "react";
import DisplayMenu from "./components/DisplayMenu";
import { Header, Container } from "semantic-ui-react";
import Registration from "./components/Registration";

const App = () => {
  return (
    <>
      <Header as="h1" textAlign="center">
        Slowfood
      </Header>
      <Container>
        <Registration/>
        <DisplayMenu />
      </Container>
    </>
  );
};

export default App;
