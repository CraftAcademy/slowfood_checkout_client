describe("User can become subscriber", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/products",
      response: "fixture:product_data.json",
    });
    cy.visit("/");
  });
  describe("successfully", () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/auth",
        response: "fixture:register_user.json",
        headers: {
          uid: "user@mail.com",
        },
      });
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/subscriptions",
        response: 'fixture:stripe_response.json'
      });
      cy.get('[data-cy="register-button"]').click();
      cy.get('[data-cy="email-field"]').type("user@mail.com");
      cy.get('[data-cy="password-field"]').type("password");
      cy.get('[data-cy="password-confirmation-field"]').type("password");
      cy.get('[data-cy="submit"]').click();
    });

    it("with money on their card", () => {
      cy.get('[data-cy="become-subscriber"]').click();

      cy.wait(1000);

      cy.get('[data-cy="card-number"]').within(() => {
        cy.get('iframe[name^="__privateStripeFrame"]').then(($iframe) => {
          const $body = $iframe.contents().find("body");
          cy.wrap($body)
            .find('input[name="cardnumber"]')
            .type("4242424242424242", { delay: 50 });
        });
      });
      cy.get('[data-cy="card-expiry"]').within(() => {
        cy.get('iframe[name^="__privateStripeFrame"]').then(($iframe) => {
          const $body = $iframe.contents().find("body");
          cy.wrap($body)
            .find('input[name="exp-date"]')
            .type("0424", { delay: 10 });
        });
      });
      cy.get('[data-cy="card-cvc"]').within(() => {
        cy.get('iframe[name^="__privateStripeFrame"]').then(($iframe) => {
          const $body = $iframe.contents().find("body");
          cy.wrap($body)
            .find('input[name="cvc"]')
            .type("424", { delay: 10 });
        });
      });

      cy.get('[data-cy="submit-payment"]').click()
      cy.get('[data-cy="payment-message"]').should('contain','Thank you for your money!')
    });
  });
});
