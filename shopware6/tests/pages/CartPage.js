class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.BASE_URL = "https://www.shopware6-demo.development-s25.com";

    this.lineItem = page.locator(".cart-item, .line-item").first();
    this.checkoutBtn = page
      .getByRole("link", { name: /zur kasse|checkout|weiter/i })
      .first();
  }

  async open() {
    await this.page.goto(`${this.BASE_URL}/checkout/cart`, {
      waitUntil: "networkidle",
    });
  }

  async proceedToCheckout() {
    await this.checkoutBtn.waitFor({ state: "visible" });
    await this.page.goto(`${this.BASE_URL}/checkout/register`, {
      waitUntil: "networkidle",
    });
  }
}

module.exports = { CartPage };
