describe("Nutrition Tracker", () => {
  beforeEach(() => {
    cy.task("reseed");
  });
  it("should allow the user to log a food entry and see it in today's list", () => {
    cy.visit("/");

    cy.get('input[name="food"]').type("Ägg");
    cy.get('input[name="calories"]').type("150");
    cy.get('input[name="protein"]').type("12");
    cy.get('input[name="fat"]').type("10");
    cy.get('input[name="carbs"]').type("1");

    cy.contains("Submit").click();

    cy.get("ul").should("contain.text", "Ägg");
    cy.get("ul").should("contain.text", "150 kcal");

    cy.get('[data-testid="progress-calores"]').should(
      "contain.text",
      "150 / 2000"
    );
  });
  it("should be able to delete todo", () => {
    cy.visit("/");
    cy.contains("Feed the cat").find("button").click();
    cy.get("li").should("have.length", 2);
    cy.contains("Feed the cat").should("not.exist");
  });
});
