# Shopware 6 – Guest Checkout E2E Test (Page Object Model)

Automated end-to-end test për **guest checkout flow** të Shopware 6 demo store, shkruar me **Playwright + JavaScript** duke përdorur **Page Object Model (POM)**.

---

## Target Environment

| Property  | Value                                            |
| --------- | ------------------------------------------------ |
| Store URL | `https://www.shopware6-demo.development-s25.com` |
| Platform  | Shopware 6 (German locale)                       |
| Framework | Playwright 1.44+                                 |
| Language  | Node.js / JavaScript                             |
| Pattern   | Page Object Model (POM)                          |
| Browser   | Chromium (Chrome) — default                      |

---

## Struktura e projektit

```
shopware6-e2e-tests/
├── tests/
│   ├── pages/
│   │   ├── HomePage.js          ← Faqja kryesore + cookie banner
│   │   ├── ProductPage.js       ← Detajet e produktit + shto në shportë
│   │   ├── CartPage.js          ← Shporta + vazhdo tek checkout
│   │   ├── CheckoutPage.js      ← Adresa + guest form + posto porosinë
│   │   └── ConfirmationPage.js  ← Verifiko konfirmimin
│   └── guest-checkout.spec.js   ← Testi kryesor
├── playwright.config.js
├── package.json
└── README.md
```

---

## Klasat dhe përgjegjësia e secilës

| Klasa              | Skedari                     | Çfarë menaxhon                                          |
| ------------------ | --------------------------- | ------------------------------------------------------- |
| `HomePage`         | `pages/HomePage.js`         | Hap faqen, dismiss cookie banner, navigon te kategoritë |
| `ProductPage`      | `pages/ProductPage.js`      | Shfaq produktin, shton në shportë, pret cart update     |
| `CartPage`         | `pages/CartPage.js`         | Shikon shportën, vazhdon tek checkout                   |
| `CheckoutPage`     | `pages/CheckoutPage.js`     | Guest option, plotëson adresën, vendos porosinë         |
| `ConfirmationPage` | `pages/ConfirmationPage.js` | Verifikon konfirmimin dhe numrin e porosisë             |

---

## Prerequisites

| Tool    | Versioni minimal   |
| ------- | ------------------ |
| Node.js | 18 LTS ose më i ri |
| npm     | 9+                 |

---

## Setup

```bash
# 1. Klono ose shpakoze projektin
git clone https://github.com/YOUR_USERNAME/shopware6-e2e-tests.git
cd shopware6-e2e-tests

# 2. Instalo dependencies
npm install

# 3. Instalo Chromium browser
npx playwright install chromium
```

---

## Si të ekzekutosh testin

```bash
# Headless — më i shpejtë, për CI
npm test

# Me browser të hapur — për debug lokal
npm run test:headed

# Hap pas hapi me debugger
npm run test:debug

# Shfaq raportin HTML pas ekzekutimit
npm run report
```

---

## Hapat e testit me assertions

| Hapi | Aksion                        | Assertion                                          |
| ---- | ----------------------------- | -------------------------------------------------- |
| 1    | Hap homepage                  | ✅ URL + logo visible                              |
| 2    | Shkon te Clothing → Women     | ✅ URL + product cards                             |
| 3    | Hap Demo Produkt (SW10001)    | ✅ Heading + çmimi visible                         |
| 4    | Klikon "In den Warenkorb"     | ✅ Cart badge ≠ 0                                  |
| 5    | Shikon `/checkout/cart`       | ✅ Line-item + checkout button                     |
| 6    | Shkon te `/checkout/register` | ✅ URL matches                                     |
| 7    | Zgjedh Guest checkout         | —                                                  |
| 8    | Plotëson formularin e adresës | ✅ Form submit, vazhdon                            |
| 9    | Konfirmon metodën e dërgimit  | ✅ Vazhdon                                         |
| 10   | Pranon T&C + poston porosinë  | —                                                  |
| 11   | Faqja e konfirmimit           | ✅ URL `/checkout/finish` + heading + order number |

---

## Çfarë do të përmirësoja me më shumë kohë

1. **TypeScript** — shtimi i tipave për Page Objects bën kodin më të sigurt
2. **Fixtures** — krijimi i produktit dhe cart-it përmes API (Store API e Shopware) pa kaluar nga UI
3. **Environment variables** — `.env` skedar për URL dhe kredenciale
4. **Cross-browser** — aktivizimi i Firefox dhe WebKit në `playwright.config.js`
5. **GitHub Actions CI** — workflow automatik në çdo Pull Request
6. **Teste negative** — cart bosh, email invalid, fushë e zbrazët
7. **Visual regression** — screenshot diff me Percy ose Playwright
