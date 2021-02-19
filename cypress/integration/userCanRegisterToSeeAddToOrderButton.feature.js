describe("Add to order button", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/products",
      response: "fixture:product_data.json",
    });
    cy.visit("/");
  });
  describe("is visible", () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/auth",
        response: "fixture:register_user.json",
        headers: {
          uid: "user@mail.com",
        },
      });
    });

    it("for successfully authenticated user", () => {
      cy.get('[data-cy="register-button"]').click();
      cy.get('[data-cy="email-field"]').type("user@mail.com");
      cy.get('[data-cy="password-field"]').type("password");
      cy.get('[data-cy="password-confirmation-field"]').type("password");
      cy.get('[data-cy="submit"]').click();

      cy.get('[data-cy="product-1"]').within(() => {
        cy.get('[data-cy="order-button"]').should("be.visible");
      });
    });
  });

  describe("is not visible", () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/auth",
        status: 401,
        response: {
          errors: {
            full_messages: ["Invalid login credentials. Please try again."],
          },
          success: false,
        },
      });
    });
    it("if user is not authenticated", () => {
      cy.get('[data-cy="product-1"]').within(() => {
        cy.get('[data-cy="order-button"]').should("not.exist");
      });
      cy.get('[data-cy="register-button"]').click();
      cy.get('[data-cy="email-field"]').type("user@mail.com");
      cy.get('[data-cy="password-field"]').type("password");
      cy.get('[data-cy="password-confirmation-field"]').type("wrong-password");
      cy.get('[data-cy="submit"]').click();
      cy.get('[data-cy="product-1"]').within(() => {
        cy.get('[data-cy="order-button"]').should("not.exist");
      });
    });
  });
});
