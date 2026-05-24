class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.BASE_URL = "https://www.shopware6-demo.development-s25.com";

    // Selectors
    this.logo = page.locator('a[title="Zur Startseite gehen"]');
    this.cookieBtn = page.getByRole("button", {
      name: /nur technisch notwendige/i,
    });
  }

  async open() {
    await this.page.goto(this.BASE_URL, { waitUntil: "networkidle" });
    await this.dismissCookieBanner();
  }

  async dismissCookieBanner() {
    const visible = await this.cookieBtn
      .isVisible({ timeout: 5_000 })
      .catch(() => false);
    if (visible) {
      await this.cookieBtn.click();
    }
  }

  async navigateToWomenCategory() {
    await this.page.goto(`${this.BASE_URL}/Clothing/Women/`, {
      waitUntil: "networkidle",
    });
  }
}

module.exports = { HomePage };
