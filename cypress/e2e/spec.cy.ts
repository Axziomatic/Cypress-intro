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
  it("should show a warning when the user exceeds the calorie goal", () => {
    cy.visit("/");

    cy.get('input[name="food').type("Big Meal");
    cy.get('input[name="calories').type("2000");
    cy.get('input[name="protein').type("50");
    cy.get('input[name="fat').type("70");
    cy.get('input[name="carbs').type("200");
    cy.contains("Add").click();

    cy.get('[data-testid="progress-calories"]').should(
      "contain.text",
      "2000 / 2000"
    );

    cy.get('input[name="food"').clear().type("Snack");
    cy.get('input[name="calories"').clear().type("250");
    cy.get('input[name="protein"').clear().type("5");
    cy.get('input[name="fat"').clear().type("10");
    cy.get('input[name="carbs"').clear().type("30");

    cy.contains("Add").click();

    cy.contains("You have exceeded your calorie goal by 250 kcal")
      .should("be.visible")
      .and("have.class", "text-red-600");
  });

  it("should show totals for today's intake", () => {
    cy.get('input[name="food"]').type("Ägg");
    cy.get('input[name="calories"]').type("150");
    cy.get('input[name="protein"]').type("12");
    cy.get('input[name="fat"]').type("10");
    cy.get('input[name="carbs"]').type("1");
    cy.contains("Add").click();

    cy.get('input[name="food"]').type("Banan");
    cy.get('input[name="calories"]').type("100");
    cy.get('input[name="protein"]').type("1");
    cy.get('input[name="fat"]').type("0");
    cy.get('input[name="carbs"]').type("27");
    cy.contains("Add").click();

    cy.get('input[data-testid="totals"]').should("contain.text", "250kcal");
    cy.get('input[data-testid="totals"]').should("contain.text", "13g protein");
    cy.get('input[data-testid="totals"]').should("contain.text", "10g fat");
    cy.get('input[data-testid="totals"]').should("contain.text", "28g carbs");
  });
});
