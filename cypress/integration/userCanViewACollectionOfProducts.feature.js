describe("User can see a collection of products", () => {

  describe("when there are products", () => {
    before(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/products",
        response: "fixture:product_data.json",
      });
      cy.visit("/");
    });

    it("successfully", () => {
      cy.get("[data-cy='menu']").within(() => {
        cy.contains("Entrecôte with chanterelle sauce and potato gratin");
        cy.contains("Raindeer tartare");
        cy.contains("Swedish pancake with lingonberries");
      });
    });
  });

  describe("when there are NO products", () => {
    before(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/products",
        response: {products: []},
      });
      cy.visit("/");
    });

    it("unsuccessfully", () => {
      cy.get("[data-cy='menu']").should("be.empty");
    });
  });
});
