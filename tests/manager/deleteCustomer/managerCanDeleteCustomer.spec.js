import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { AddCustomerPage } from "../../../src/pages/manager/AddCustomerPage";
import { CustomersListPage } from "../../../src/pages/manager/CustomersListPage";

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

test("Assert manager can delete customer", async ({ page }) => {
  const customersListPage = new CustomersListPage(page);

  await customersListPage.open();

  await customersListPage.deleteCustomer(firstName);
  await customersListPage.expectCustomerNotPresent(firstName);

  await page.reload();
  await customersListPage.expectCustomerNotPresent(firstName);
});
