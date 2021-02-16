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
        cy.contains("Vesuvio");
        cy.contains("Capricciosa");
        cy.contains("Funghi");
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
