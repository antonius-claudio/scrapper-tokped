const puppeteer = require('puppeteer');

async function getCategories(link) {
    const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox'] });
    // const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.setViewport({ width: 1000, height: 926 });
    await page.setRequestInterception(true);
    page.on('request', interceptedRequest => {
      if (interceptedRequest.url().endsWith('.png') 
      || interceptedRequest.url().endsWith('.jpg') 
      || interceptedRequest.url().endsWith('.jpeg')
      || interceptedRequest.url().endsWith('.webp'))
        interceptedRequest.abort();
      else
        interceptedRequest.continue();
    });
    await page.goto(`${link}`, {
        waitUntil: 'networkidle2',
    });

    const productsLink = await page.evaluate(() => {
        const containPage = document.querySelectorAll(
          '#zeus-root > div > div.css-1geyxdk > div.css-a6gim0 > aside.css-1dify21 > div > div > div > div > ul > li.css-z2vy7e'
        );
        const products = [];
        containPage.forEach((element) => {
          const category = element.querySelector('a').textContent;
          const linkCategory = element.querySelector('li[class="css-z2vy7e"] > a').href;
          let index = 0;
          if (category != null && category != 'Produk Terjual' && category != 'Preorder') {
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