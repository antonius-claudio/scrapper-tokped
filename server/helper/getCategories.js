const puppeteer = require('puppeteer');
const scrollPageToBottom =  require('puppeteer-autoscroll-down');

async function getCategories(link) {
    const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox'] });
    // const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.setRequestInterception(true);
    page.on('request', interceptedRequest => {
      if (interceptedRequest.url().endsWith('.png') 
      || interceptedRequest.url().endsWith('.webp')
      || interceptedRequest.url().endsWith('.jpeg')
      || interceptedRequest.url().endsWith('.jpg')) 
        interceptedRequest.abort();
      else
        interceptedRequest.continue();
    });
    await page.goto(`${link}`, {
        waitUntil: 'networkidle2',
    });
    await scrollPageToBottom(page)

    let productsLink = await page.evaluate(() => {
        const containPage = document.querySelectorAll(
          '#zeus-root > div > div.css-1geyxdk > div.css-1kn5b1o > aside > div > div > div > div > ul > li'
        );
        const products = [];
        containPage.forEach((element) => {
          const category = element.querySelector('a').textContent;
          const linkCategory = element.querySelector('a').href;
          if (category !== null && category !== 'Semua Produk' && category !== 'Produk Terjual' && category !== 'Preorder') {
            products.push({ category, linkCategory });
          }
        });
        return products;
    });

    await page.close();
    await browser.close();
    return productsLink;
}

module.exports = getCategories;