describe("todo", () => {
  it("should display three todos by default", () => {
    cy.visit("http://localhost:3000");
    cy.get("li").should("have.length", 3);
    cy.get("li").first().should("contain.text", "Feed the cat");
    cy.get("li").last().contains("Walk all the cats");
  });
});
