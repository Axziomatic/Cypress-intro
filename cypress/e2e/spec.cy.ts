describe("Nutrition Tracker", () => {
  beforeEach(() => {
    cy.task("reseed");
  });
  it("should allow the user to log a food entry and see it in today's list", () => {
    cy.visit("/");

    cy.get('input[name="food"]').type("Egg");
    cy.get('input[name="calories"]').type("150");
    cy.get('input[name="protein"]').type("12");
    cy.get('input[name="fat"]').type("10");
    cy.get('input[name="carbs"]').type("1");

    cy.contains("Add").click();

    cy.get("ul").should("contain.text", "Egg");
    cy.get("ul").should("contain.text", "150 kcal");

    cy.get('[data-testid="progress-calories"]', { timeout: 5000 })
      .should("exist") // vänta tills elementet finns
      .and("contain.text", "Calories: 150 kcal / 2000 kcal");
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
      "2000 kcal / 2000 kcal"
    );

    cy.get('input[name="food"').clear().type("Snack");
    cy.get('input[name="calories"').clear().type("250");
    cy.get('input[name="protein"').clear().type("5");
    cy.get('input[name="fat"').clear().type("10");
    cy.get('input[name="carbs"').clear().type("30");

    cy.contains("Add").click();

    cy.contains("You have exceeded your calories goal by 250 kcal")
      .should("be.visible")
      .and("have.class", "text-red-600");
  });

  it("should show totals for today's intake", () => {
    cy.visit("/");

    cy.get('input[name="food"]').type("Ägg");
    cy.get('input[name="calories"]').type("150");
    cy.get('input[name="protein"]').type("12");
    cy.get('input[name="fat"]').type("10");
    cy.get('input[name="carbs"]').type("1");
    cy.contains("Add").click();
    cy.wait(3000);

    cy.get('input[name="food"]').type("Banan");
    cy.get('input[name="calories"]').type("100");
    cy.get('input[name="protein"]').type("1");
    cy.get('input[name="fat"]').type("0");
    cy.get('input[name="carbs"]').type("27");
    cy.contains("Add").click();
    cy.wait(3000);

    cy.get('[data-testid="progress-calories"]').should(
      "contain.text",
      "250 kcal"
    );
    cy.get('[data-testid="progress-protein"]').should("contain.text", "13 g");
    cy.get('[data-testid="progress-fat"]').should("contain.text", "10 g");
    cy.get('[data-testid="progress-carbs"]').should("contain.text", "28 g");
  });

  //TESTING FOR CRUD

  // 1. CREATE

  it("should create a new food entry", () => {
    cy.visit("/");

    cy.get('input[name="food"]').type("Yoghurt");
    cy.get('input[name="calories"]').type("120");
    cy.get('input[name="protein"]').type("5");
    cy.get('input[name="fat"]').type("2");
    cy.get('input[name="carbs"]').type("15");
    cy.contains("Add").click();

    cy.get("ul").should("contain.text", "Yoghurt");
    cy.get("ul").should("contain.text", "120 kcal");
  });

  // 2. UPDATE (READ redundant as it is already tested in previous tests)
  it("should update an existing food entry", () => {
    cy.visit("/");

    cy.get('input[name="food"]').type("Yoghurt");
    cy.get('input[name="calories"]').type("120");
    cy.get('input[name="protein"]').type("5");
    cy.get('input[name="fat"]').type("2");
    cy.get('input[name="carbs"]').type("15");
    cy.contains("Add").click();

    cy.get("ul").should("contain.text", "Yoghurt");
    cy.get("ul").should("contain.text", "120 kcal");

    cy.get("ul li")
      .first()
      .within(() => {
        cy.get("button").contains("Edit").click();
      });

    cy.get('input[name="calories"]').clear().type("200");
    cy.contains("Save").click();

    cy.get("ul li").first().should("contain.text", "200 kcal");
  });

  // 3. DELETE
  it("should delete a food entry", () => {
    cy.visit("/");

    cy.get('input[name="food"]').type("Yoghurt");
    cy.get('input[name="calories"]').type("120");
    cy.get('input[name="protein"]').type("5");
    cy.get('input[name="fat"]').type("2");
    cy.get('input[name="carbs"]').type("15");
    cy.contains("Add").click();

    cy.get("ul").should("contain.text", "Yoghurt");
    cy.get("ul").should("contain.text", "120 kcal");

    cy.get("ul li")
      .first()
      .within(() => {
        cy.get("button").contains("Delete").click();
      });

    cy.get("ul li").should("have.length.lessThan", 3);
  });
});
