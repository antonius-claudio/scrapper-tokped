const puppeteer = require('puppeteer');
const scrollPageToBottom =  require('puppeteer-autoscroll-down');

async function getList(link) {
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
        '#zeus-root > div > div.css-1geyxdk > div.css-1kn5b1o > div > div.css-8atqhb > div.css-tjjb18 > div'
      );
      const items = [];
      containPage.forEach((element) => {
        const linkItem = element.querySelector('div > div > div > div > div > div.css-1ehqh5q > a').href;

        items.push({ linkItem });
      });
      return items;
    });

    await page.close();
    await browser.close();
    return itemsLink;
}

module.exports = getList;