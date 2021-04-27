describe("A button to add product to order", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/products",
      response: "fixture:product_data.json",
    });
    cy.visit("/");
  });

  describe("should be visible", () => {
    it("for authenticated users", () => {
      cy.get('[data-cy="register"]').click();
      cy.get('[data-cy="email-input"]').type("user@mail.com");
      cy.get('[data-cy="password-input"]').type("password");
      cy.get('[data-cy="password-confirmation-input"]').type("password");
      cy.get('[data-cy="submit"]').click();
    });
  });
});
