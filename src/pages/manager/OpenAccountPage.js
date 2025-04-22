const { expect } = require("@playwright/test");

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropdown = page.locator("select#currency");
  }

  async open() {
    await this.page.goto(
      "/angularJs-protractor/BankingProject/#/manager/openAccount"
    );
  }
  async selectCurrency(value) {
    await this.currencyDropdown.selectOption(value);
  }
  async assertCurrencyIs(value) {
    await expect(this.currencyDropdown).toHaveValue(value);
  }
}

Op;
