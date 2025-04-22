import { test } from "@playwright/test";
import { BankHomePage } from "../../../src/pages/BankHomePage";
import { BankManagerMainPage } from "../../../src/pages/manager/BankManagerMainPage";

test("Assert manager can Login ", async ({ page }) => {
  const homePage = new BankHomePage(page);
  const bankManagerMainPage = new BankManagerMainPage(page);

  await homePage.open();
  await homePage.clickManagerLoginButton();
  await bankManagerMainPage.visibleButton();
});
