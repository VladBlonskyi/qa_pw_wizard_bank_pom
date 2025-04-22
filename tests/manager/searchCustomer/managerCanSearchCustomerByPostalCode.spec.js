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
});

test("Assert manager can search customer by Post Code", async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.customers();
  await addCustomerPage.searchFirstname(postCode);
  await page.waitForTimeout(2000);

  const rows = await page.locator("table tbody tr");
  await expect(rows).toHaveCount(1);

  const lastRow = rows.last();
  const rowText = await lastRow.textContent();

  expect(rowText).toContain(postCode);
});
