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

  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */
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

  /* 
Test:
1. Click [Open Account].
2. Select Customer name you just created.
3. Select currency.
4. Click [Process].
5. Reload the page (This is a simplified step to close the popup).
6. Click [Customers].
7. Assert the customer row has the account number not empty.


await page.waitForTimeout(2000);
Tips:
 1. Do not rely on the customer row id for the step 13. Use the ".last()" locator to get the last row.
*/
});
