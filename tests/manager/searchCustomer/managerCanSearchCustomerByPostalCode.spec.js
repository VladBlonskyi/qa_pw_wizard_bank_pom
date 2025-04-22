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

  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
});

test("Assert manager can search customer by Last Name", async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.customers();
  await addCustomerPage.searchFirstname(postCode);
  await page.waitForTimeout(2000);

  const rows = await page.locator("table tbody tr");
  await expect(rows).toHaveCount(1);

  const lastRow = rows.last();
  const rowText = await lastRow.textContent();

  expect(rowText).toContain(postCode);

  /* 
Test:
1. Open Customers page
2. Fill the firstName to the search field
3. Assert customer row is present in the table. 
4. Assert no other rows is present in the table.
*/
});
