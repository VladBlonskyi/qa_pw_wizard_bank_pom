import { test } from "@playwright/test";
import { AddCustomerPage } from "../../../src/pages/manager/OpenAccountPage";

test("Assert manager can choose currencies for account", async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();

  await addCustomerPage.selectCurrency("Dollar");
  await addCustomerPage.assertCurrencyIs("Dollar");

  await addCustomerPage.selectCurrency("Pound");
  await addCustomerPage.assertCurrencyIs("Pound");

  await addCustomerPage.selectCurrency("Rupee");
  await addCustomerPage.assertCurrencyIs("Rupee");

  /* 
Test:
1. Open the Open account page https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount
2. Select currency Dollar
3. Assert the drop-dwon has value Dollar
4. Select currency Pound
5. Assert the drop-dwon has value Pound
6. Select currency Rupee
7. Assert the drop-dwon has value Rupee
*/
});
