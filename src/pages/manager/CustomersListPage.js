const { expect } = require("@playwright/test");

export class CustomersListPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto("/angularJs-protractor/BankingProject/#/manager/list");
  }
  async deleteCustomer(firstName) {
    const row = this.page.locator("table tbody tr", {
      hasText: firstName,
    });
    await row.getByRole("button", { name: "Delete" }).click();
  }

  async expectCustomerNotPresent(firstName) {
    await expect(
      this.page.locator("table tbody tr", { hasText: firstName })
    ).toHaveCount(0);
  }
}
