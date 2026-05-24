class ProductPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.BASE_URL = "https://www.shopware6-demo.development-s25.com";
    this.productHeading = page.getByRole("heading", { name: /demo produkt/i });
    this.productPrice = page
      .locator('.product-detail-price, [itemprop="price"]')
      .first();
    this.addToCartBtn = page
      .locator(
        'button.btn-buy, button[type="submit"]:has-text("Warenkorb"), .btn-buy',
      )
      .first();
    this.cartBadge = page
      .locator(
        ".header-cart-badge, .cart-item-count, [data-cart-widget] .badge",
      )
      .first();
    this.productCards = page
      .locator(".product-image-wrapper, .card.product-box")
      .first();
  }

  async openProductDetail() {
    await this.page.goto(`${this.BASE_URL}/Demo-Produkt/SW10001`, {
      waitUntil: "networkidle",
    });
  }

  async addToCart() {
    await this.addToCartBtn.waitFor({ state: "visible" });
    await this.addToCartBtn.click();
  }

  async waitForCartUpdate() {
    await this.cartBadge.waitFor({ state: "visible", timeout: 10_000 });
  }
}

module.exports = { ProductPage };
