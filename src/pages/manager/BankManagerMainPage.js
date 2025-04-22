const { expect } = require("@playwright/test");

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.buttonAddCustomer = page.getByRole("button", { name: "Add Customer" });
    this.buttonOpenAccount = page.getByRole("button", { name: "Open Account" });
    this.buttonCustomers = page.getByRole("button", { name: "Customers" });
  }

  async open() {
    await this.page.goto("/angularJs-protractor/BankingProject/#/manager");
  }

  async visibleButton() {
    await expect(this.buttonAddCustomer).toBeVisible();
    await expect(this.buttonOpenAccount).toBeVisible();
    await expect(this.buttonCustomers).toBeVisible();
  }
}
