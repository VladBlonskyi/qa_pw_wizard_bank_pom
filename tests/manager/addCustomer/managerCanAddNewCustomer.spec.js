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

/* 
Test:
1. Open add customer page by link https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust
2. Fill the First Name.  
3. Fill the Last Name.
4. Fill the Postal Code.
5. Click [Add Customer].
6. Reload the page (This is a simplified step to close the popup)
7. Click [Customers] button.
8. Assert the First Name of the customer is present in the table in the last row. 
9. Assert the Last Name of the customer is present in the table in the last row. 
10. Assert the Postal Code of the customer is present in the table in the last row. 
11. Assert there is no account number for the new customer in the table in the last row. 

Tips:
1. Use faker for test data generation, example:
usage:
 const firstName = faker.person.firstName();
 const lastName = faker.person.LastName();
 const postCode = faker.location.zipCode(); 

 2. Do not rely on the customer row id for the steps 8-11. Use the ".last()" locator to get the last row.
   // await page.waitForURL(
  //   "https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list",
  //   { timeout: 5000 } // можна змінити значення за потреби
  // );
  // await expect(page.locator("table")).toBeVisible();
*/
