class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.guestOption = page
      .locator(
        '[id*="guest"], label:has-text("Gast"), input[value="guest"], a:has-text("Gast")',
      )
      .first();

    this.salutation = page
      .locator('select[name="salutationId"], #personalSalutation')
      .first();
    this.firstName = page
      .locator('input[name="firstName"], #personalFirstName')
      .first();
    this.lastName = page
      .locator('input[name="lastName"], #personalLastName')
      .first();
    this.email = page.locator('input[name="email"], #personalMail').first();
    this.street = page
      .locator(
        'input[name="billingAddress[street]"], #billingAddressAddressStreet, input[name="street"]',
      )
      .first();
    this.zipcode = page
      .locator(
        'input[name="billingAddress[zipcode]"], #billingAddressAddressZipcode, input[name="zipcode"]',
      )
      .first();
    this.city = page
      .locator(
        'input[name="billingAddress[city]"], #billingAddressAddressCity, input[name="city"]',
      )
      .first();
    this.country = page
      .locator(
        'select[name="billingAddress[countryId]"], #billingAddressAddressCountry, select[name="countryId"]',
      )
      .first();

    this.submitAddressBtn = page
      .locator(
        'button[type="submit"]:has-text("Weiter"), .register-submit button, button.btn-primary[type="submit"]',
      )
      .first();
    this.continueBtn = page
      .locator(
        'button[type="submit"]:has-text("Weiter"), .confirm-main-header button',
      )
      .first();
    this.tosCheckbox = page
      .locator('input[name="tos"], #tos, input[type="checkbox"][id*="tos"]')
      .first();
    this.placeOrderBtn = page
      .locator(
        'button[form="confirmOrderForm"], button:has-text("Zahlungspflichtig bestellen"), button:has-text("Jetzt bestellen"), button[type="submit"]:has-text("bestellen")',
      )
      .first();
  }

  async selectGuestCheckout() {
    const visible = await this.guestOption
      .isVisible({ timeout: 5_000 })
      .catch(() => false);
    if (visible) {
      await this.guestOption.click();
    }
  }

  async fillAddressForm({ firstName, lastName, email, street, zipcode, city }) {
    const salutationVisible = await this.salutation
      .isVisible({ timeout: 5_000 })
      .catch(() => false);
    if (salutationVisible) {
      await this.salutation.selectOption({ index: 1 });
    }

    await this.firstName.waitFor({ state: "visible" });
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.street.fill(street);
    await this.zipcode.fill(zipcode);
    await this.city.fill(city);

    const countryVisible = await this.country
      .isVisible({ timeout: 3_000 })
      .catch(() => false);
    if (countryVisible) {
      await this.country.selectOption({ label: /deutschland|germany/i });
    }
  }

  async submitAddress() {
    await this.submitAddressBtn.waitFor({ state: "visible" });
    await this.submitAddressBtn.click();
    await this.page.waitForURL(/checkout/, { timeout: 20_000 });
  }

  async confirmShippingMethod() {
    const visible = await this.continueBtn
      .isVisible({ timeout: 5_000 })
      .catch(() => false);
    if (visible) {
      await this.continueBtn.click();
      await this.page.waitForURL(/checkout/, { timeout: 15_000 });
    }
  }

  async acceptTermsAndPlaceOrder() {
    const tosVisible = await this.tosCheckbox
      .isVisible({ timeout: 5_000 })
      .catch(() => false);
    if (tosVisible) {
      await this.tosCheckbox.check();
    }

    await this.placeOrderBtn.waitFor({ state: "visible" });
    await this.placeOrderBtn.click();
  }
}

module.exports = { CheckoutPage };
