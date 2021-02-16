describe('Add to order button', () => {
  describe('is visible', () => {
    beforeEach(() => {
      cy.server()
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/products",
        response: 'fixture:product_data.json'
      });
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/auth",
        response: 'fixture:register_user.json',
        headers: {
          uid: "user@mail.com"
        }
      });
      cy.visit('/')
    })
    it("for authenticated user", () => {
      cy.get('[data-cy="register-button"]').click()
      cy.get('[data-cy="email-field"]').type('user@mail.com')
      cy.get('[data-cy="password-field"]').type('password')
      cy.get('[data-cy="password-confirmation-field"]').type("password");
      cy.get('[data-cy="submit"]').click()

      cy.get('[data-cy="product-1"]').within(() => {
        cy.get('[data-cy="order-button"]').should('be.visible')
      })
    });

  })
  
})
