const { expect } = require("@playwright/test");

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameFill = page.getByPlaceholder("First Name");
    this.lastNameFill = page.getByPlaceholder("Last Name");
    this.postCodeFill = page.getByPlaceholder("Post Code");
    this.addCustomerButton = page
      .getByRole("form")
      .getByRole("button", { name: "Add Customer" });
    this.customersButton = page.getByRole("button", { name: "Customers" });
    //
    this.openAccountButton = page.getByRole("button", { name: "Open Account" });
    this.currencyDropdown = page.locator("select#currency");
    this.userDropdown = page.locator("select#userSelect");
    this.processButtonClick = page.getByRole("button", { name: "Process" });
    //
    this.searchByFirstname = page.getByPlaceholder("Search Customer");
  }

  async open() {
    await this.page.goto(
      "/angularJs-protractor/BankingProject/#/manager/addCust"
    );
  }
  async firstName(name) {
    await this.firstNameFill.fill(name);
  }
  async lastName(name) {
    await this.lastNameFill.fill(name);
  }
  async postCode(digit) {
    await this.postCodeFill.fill(digit);
  }
  async addButton() {
    await this.addCustomerButton.click();
  }
  async customers() {
    await this.customersButton.click();
  }
  //
  async openAccount() {
    await this.openAccountButton.click();
  }
  async selectCurrency(value) {
    await this.currencyDropdown.selectOption(value);
  }
  async selectUser(value) {
    await this.userDropdown.selectOption(value);
  }
  async processClick() {
    await this.processButtonClick.click();
  }
  // OpenCustumore

  async searchFirstname(firstname) {
    await this.searchByFirstname.fill(firstname);
  }
}

/*
getByRole('button', { name: 'Customers' })
getByPlaceholder('Search Customer')
*/
