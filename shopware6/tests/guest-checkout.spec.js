const { test, expect } = require("@playwright/test");
const { HomePage } = require("./pages/HomePage");
const { ProductPage } = require("./pages/ProductPage");
const { CartPage } = require("./pages/CartPage");
const { CheckoutPage } = require("./pages/CheckoutPage");
const { ConfirmationPage } = require("./pages/ConfirmationPage");
const GUEST = {
  firstName: "Test",
  lastName: "Guest",
  email: "testguest@example.com",
  street: "Musterstrasse 1",
  zipcode: "10115",
  city: "Berlin",
};

test.describe("Guest Checkout Flow", () => {
  test.setTimeout(120_000);

  test("should complete a full guest checkout and show order confirmation", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const confirmationPage = new ConfirmationPage(page);

    //StepP 1: Open the storefront
    await test.step("Open the storefront homepage", async () => {
      await homePage.open();

      await expect(page).toHaveURL(/shopware6-demo/);
      await expect(homePage.logo).toBeVisible();
    });

    //Step 2: Navigate to a product category
    await test.step("Navigate to the Women category", async () => {
      await homePage.navigateToWomenCategory();

      await expect(page).toHaveURL(/\/Clothing\/Women/);
      await expect(productPage.productCards).toBeVisible();
    });

    // Step 3: Open the product detail page
    await test.step("Open the Demo Product detail page", async () => {
      await productPage.openProductDetail();

      await expect(page).toHaveURL(/SW10001/);
      await expect(productPage.productHeading).toBeVisible();
      await expect(productPage.productPrice).toBeVisible();
    });

    // Step 4: Add the product to the cart
    await test.step("Add the product to the cart", async () => {
      await productPage.addToCart();
      await productPage.waitForCartUpdate();

      await expect(productPage.cartBadge).not.toHaveText("0", {
        timeout: 10_000,
      });
    });

    //Step 5: View the cart
    await test.step("Navigate to the cart and verify the line item", async () => {
      await cartPage.open();

      await expect(page).toHaveURL(/\/checkout\/cart/);
      await expect(cartPage.lineItem).toBeVisible();
      await expect(cartPage.checkoutBtn).toBeVisible();
    });

    //Step 6: Go to the checkout register page
    await test.step("Proceed to the checkout register page", async () => {
      await cartPage.proceedToCheckout();

      await expect(page).toHaveURL(/\/checkout\/register/);
    });

    // Step 7: Choose guest checkout
    await test.step("Select the guest checkout option", async () => {
      await checkoutPage.selectGuestCheckout();
    });

    //Step 8: Fill in the guest address form
    await test.step("Fill in the guest shipping address", async () => {
      await checkoutPage.fillAddressForm(GUEST);
      await checkoutPage.submitAddress();

      await expect(page).toHaveURL(/checkout/);
    });

    //Step 9: Confirm shipping and payment method
    await test.step("Confirm the shipping and payment method", async () => {
      await checkoutPage.confirmShippingMethod();
    });

    //Step 10: Accept T&C and place the order
    await test.step("Accept terms and conditions and place the order", async () => {
      await expect(page).toHaveURL(/\/checkout\/confirm/, { timeout: 20_000 });
      await checkoutPage.acceptTermsAndPlaceOrder();
    });

    //Step 11: Verify the order confirmation
    await test.step("Verify the order confirmation page", async () => {
      await confirmationPage.waitForConfirmation();

      await expect(page).toHaveURL(/\/checkout\/finish/);
      expect(await confirmationPage.isConfirmationHeadingVisible()).toBe(true);
      expect(await confirmationPage.isOrderNumberVisible()).toBe(true);
    });
  });
});
