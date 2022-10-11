const puppeteer = require('puppeteer');
const scrollPageToBottom =  require('puppeteer-autoscroll-down');

async function getListShopee(link) {
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
    
    let itemsLink = await page.evaluate(() => {
      const containPage = document.querySelectorAll(
        '#main > div > div:nth-child(3) > div > div > div > div.shop-page > div > div.container > div.shop-page__all-products-section > div.shop-page_product-list > div > div.shop-search-result-view > div > div'
      );
      const items = [];
      containPage.forEach((element) => {
        const linkItem = element.querySelector('a').href;
        
        items.push({ linkItem });
      });
      return items;
    });

    await page.close();
    await browser.close();
    return itemsLink;
}

module.exports = getListShopee;