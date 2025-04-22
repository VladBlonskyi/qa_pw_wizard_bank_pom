import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { AddCustomerPage } from "../../../src/pages/manager/AddCustomerPage";

let firstName, lastName, postCode;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.firstName(firstName);
  await addCustomerPage.lastName(lastName);
  await addCustomerPage.postCode(postCode);
  await addCustomerPage.addButton();
  await page.reload();
});

test("Assert manager can add new customer", async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  const fullName = `${firstName} ${lastName}`;
  const accountNumbers = page.locator("table tbody tr td:nth-child(4)");

  await addCustomerPage.openAccount();
  await addCustomerPage.selectUser(fullName);
  await addCustomerPage.selectCurrency("Dollar");
  await addCustomerPage.processClick();
  await page.reload();
  await addCustomerPage.customers();
  await page.waitForTimeout(2000);
  await expect(accountNumbers.last()).toHaveText(/\S+/);
});
