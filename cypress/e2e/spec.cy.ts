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

    cy.contains("Add").click();

    cy.get("ul").should("contain.text", "Ägg");
    cy.get("ul").should("contain.text", "150 kcal");

    cy.get('[data-testid="progress-calories"]').should(
      "contain.text",
      "150 / 2000"
    );
  });
});
