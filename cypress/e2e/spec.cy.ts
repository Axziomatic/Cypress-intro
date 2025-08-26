describe("todo", () => {
  it("should display three todos by default", () => {
    cy.visit("http://localhost:3000");
    cy.get("li").should("have.length", 3);
    cy.get("li").first().should("contain.text", "Feed the cat");
    cy.get("li").last().contains("Walk all the cats");
  });
  it("should be able to delete todo", () => {
    cy.visit("http://localhost:3000");
    cy.get("button").first().click();
    cy.get("li")
      .should("have.length", 2)
      .first()
      .should("not.contain.text", "Feed the cat");
  });
});
