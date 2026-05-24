class ConfirmationPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.confirmationHeading = page
      .getByRole("heading", {
        name: /vielen dank|bestellung|danke|thank you|order confirmed/i,
      })
      .first();

    this.orderNumber = page
      .locator(".order-number, [data-order-number], .finish-order-details")
      .first();
  }

  async waitForConfirmation() {
    await this.page.waitForURL(/\/checkout\/finish/, { timeout: 30_000 });
  }

  async isConfirmationHeadingVisible() {
    return await this.confirmationHeading.isVisible({ timeout: 10_000 });
  }

  async isOrderNumberVisible() {
    return await this.orderNumber.isVisible({ timeout: 10_000 });
  }
}

module.exports = { ConfirmationPage };
