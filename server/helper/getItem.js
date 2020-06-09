const puppeteer = require('puppeteer');

async function getItem(link) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.setViewport({ width: 1000, height: 10000 });
    await page.goto(`${link}`, {
        waitUntil: 'networkidle2',
    });

    const item = await page.evaluate(() => {
        const containPage = document.querySelectorAll(
          '#zeus-root > div > div.css-1geyxdk > div.css-a6gim0 > div.css-19deanw > div.css-yxh0dp > div.css-9djufs'
        );
        const data = {};
        containPage.forEach((element) => {
          const linkItem = element.querySelector('a').href;
          const unggulanItem = element.querySelector('a > div.featured-products');

          if (unggulanItem === null) {
            items.push({ linkItem });
          }
        });
        return data;
    });

    await page.close();
    await browser.close();
    return item;
}

module.exports = getItem;