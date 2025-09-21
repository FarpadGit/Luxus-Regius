/// <reference types="cypress" />

describe("e2e", () => {
  function addCategory() {
    cy.get(".floating-buttons").find("button").contains(/.*add.*new.*category.*/i).click();
    cy.press(Cypress.Keyboard.Keys.ENTER);
  }

  function addItem(selector) {
    cy.get(selector).trigger("mouseover").find(".edit-buttons").click();
    cy.get(".button-list").find("button.add-item-btn").click();
    cy.press(Cypress.Keyboard.Keys.ENTER);
  }

  function addSubCategory(selector) {
    cy.get(selector).trigger("mouseover").find(".edit-buttons").click();
    cy.get(".button-list").find("button.add-section-btn").click();
    cy.press(Cypress.Keyboard.Keys.ENTER);
  }

  beforeEach(() => {
    cy.viewport(1280, 1024);
    cy.fixture("env").as("env");
    cy.visit("/weekly");
    // wait for nuxt hydration to complete
    cy.get("#vue-tracer-overlay", { timeout: 20000 }).should("exist");
    cy.wait(1000);
    cy.get("nav").first().find("a[href*='/login']").click();
    cy.get("@env").then((env) => {
      cy.get("input").type(env.loginPassword);
    });
    cy.get("button[type='submit']").click();
  });

  it("should log in", () => {
    cy.url().should("include", "/weekly");
    cy.get("h1").should("exist");
  });

  it("should add a new editable category heading using the control buttons", () => {
    cy.get(".floating-buttons").find("button").contains(/.*add.*new.*category.*/i).click();
    cy.get(".menu-section").find("input").then((input) => {
      cy.wrap(input.val()).as("categoryText");
      cy.wrap(input).should("have.prop", "value").and("match", /.*new.*category.*/i);
    });
    cy.press(Cypress.Keyboard.Keys.ENTER);
    cy.get("@categoryText").then(text => {
      cy.get("h2").invoke("text").then(t => t.trim()).should("equal", text);
    });
  });

  it("should have all edit buttons when new category is empty", () => {
    addCategory();
    cy.get("h2").trigger("mouseover").find(".edit-buttons").click();
    cy.get(".button-list").as("editButtons");
    cy.get("@editButtons").should("exist");
    cy.get("@editButtons").find("button").should("have.length", 3);
    cy.get("@editButtons").find("button.add-section-btn").should("exist");
    cy.get("@editButtons").find("button.add-item-btn").should("exist");
    cy.get("@editButtons").find("button.delete-btn").should("exist");
  });

  it("should not have an Add Category button when category has items", () => {
    addCategory();
    cy.get("h2").as("h2");
    addItem("@h2");
    cy.get("@h2").trigger("mouseover").find(".edit-buttons").click();
    cy.get(".button-list").as("editButtons");
    cy.get("@editButtons").find("button").should("have.length", 2);
    cy.get("@editButtons").find("button.add-section-btn").should("not.exist");
  });

  it("should not have an Add Item button when category has subcategories", () => {
    addCategory();
    cy.get("h2").as("h2");
    addSubCategory("@h2");
    cy.get("@h2").trigger("mouseover").find(".edit-buttons").click();
    cy.get(".button-list").as("editButtons");
    cy.get("@editButtons").find("button").should("have.length", 2);
    cy.get("@editButtons").find("button.add-item-btn").should("not.exist");
  });

  it("should not display an empty description paragraph", () => {
    addCategory();
    cy.get("h2").as("h2");
    addItem("@h2");
    cy.get(".item-container").as("itemContainer");
    cy.get("@itemContainer").find("p").should("have.length", 2);
    cy.get("@itemContainer").find("p.subtext").should("not.exist");
  });

  it("should reset item text when Escape is pressed in edit mode", () => {
    addCategory();
    cy.get("h2").as("h2");
    addItem("@h2");
    cy.get(".item-container").as("itemContainer");
    cy.get("@itemContainer").trigger("dblclick");
    cy.get("@itemContainer").find("input").first().as("input");
    cy.get("@input").then((input) => {
      const testText = "testText";
      cy.wrap(input.val()).as("oldValue");
      cy.wrap(input).clear().type(testText).should("have.value", testText);
    });
    cy.get("@input").trigger("keydown", { key: "Escape" });
    cy.get("@oldValue").then(oldValue => {
      cy.get("@itemContainer").find("p").first().should("have.text", oldValue);
    });    
  });
});
