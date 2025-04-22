import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { AddCustomerPage } from "../../../src/pages/manager/AddCustomerPage";

test("Assert manager can add new customer", async ({ page }) => {
  const addCustomer = new AddCustomerPage(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await addCustomer.open();
  await addCustomer.firstName(firstName);
  await addCustomer.lastName(lastName);
  await addCustomer.postCode(postCode);
  await addCustomer.addButton();

  await page.reload();
  await addCustomer.customers();

  const firstNames = page.locator("table tbody tr td:nth-child(1)");
  const lastNames = page.locator("table tbody tr td:nth-child(2)");
  const postCodes = page.locator("table tbody tr td:nth-child(3)");
  const accountNumbers = page.locator("table tbody tr td:nth-child(4)");

  await expect(firstNames.last()).toHaveText(firstName);
  await expect(lastNames.last()).toHaveText(lastName);
  await expect(postCodes.last()).toHaveText(postCode);
  await expect(accountNumbers.last()).toHaveText("");
});
