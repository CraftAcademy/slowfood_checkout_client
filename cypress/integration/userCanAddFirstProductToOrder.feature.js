describe('Create and order by', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/products",
      response: "fixture:product_data.json",
    });
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
       url: "http://localhost:3000/api/orders",
       response: 'fixture:first_product_to_order.json'
     });
     cy.visit('/')
     cy.get('[data-cy="register-button"]').click();
     cy.get('[data-cy="email-field"]').type("user@mail.com");
     cy.get('[data-cy="password-field"]').type("password");
     cy.get('[data-cy="password-confirmation-field"]').type("password");
     cy.get('[data-cy="submit"]').click();
     cy.get('[data-cy="product-1"]').within(() => {
       cy.get('[data-cy="order-button"]').click();
     });
  });
  
  
  it('successfully adding a product', () => { 
    cy.get('[data-cy="success-message"]').should(
      "contain",
      "This pizza was added to your order!"
    );
  })

  it('displays the amount of products in the order', () => {
    cy.get('[data-cy="order"]').should('contain', 'You have 1 pizza in your order')
  });
})
