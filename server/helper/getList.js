const puppeteer = require('puppeteer');

async function getList(link) {
    const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox'] });
    // const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.setViewport({ width: 1000, height: 10000 });
    await page.goto(`${link}`, {
        waitUntil: 'networkidle2',
    });

    const itemsLink = await page.evaluate(() => {
        const containPage = document.querySelectorAll(
          '#zeus-root > div > div.css-1geyxdk > div.css-a6gim0 > div.css-19deanw > div.css-yxh0dp > div.css-9djufs'
        );
        const items = [];
        containPage.forEach((element) => {
          const linkItem = element.querySelector('a').href;
          const unggulanItem = element.querySelector('a > div.featured-products');

          if (unggulanItem === null) {
            items.push({ linkItem });
          }
        });
        return items;
    });

    await page.close();
    await browser.close();
    return itemsLink;
}

module.exports = getList;