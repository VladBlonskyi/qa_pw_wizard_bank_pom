import { test } from "@playwright/test";
import { OpenAccountPage } from "../../../src/pages/manager/OpenAccountPage";

test("Assert manager can choose currencies for account", async ({ page }) => {
  const addCustomerPage = new OpenAccountPage(page);

  await addCustomerPage.open();

  await addCustomerPage.selectCurrency("Dollar");
  await addCustomerPage.assertCurrencyIs("Dollar");

  await addCustomerPage.selectCurrency("Pound");
  await addCustomerPage.assertCurrencyIs("Pound");

  await addCustomerPage.selectCurrency("Rupee");
  await addCustomerPage.assertCurrencyIs("Rupee");
});
