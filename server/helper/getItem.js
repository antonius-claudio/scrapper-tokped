const puppeteer = require('puppeteer');
const scrollPageToBottom =  require('puppeteer-autoscroll-down');

async function getItem(link) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(`${link}`, {
        waitUntil: 'networkidle2',
    });
    await scrollPageToBottom(page)
    
    let item = await page.evaluate(() => {
      let title = document.querySelector('div.css-636bko > h1.css-x7lc0h').innerHTML;
      let price = String(document.querySelector('div.css-eyzclq > dd > h3').innerHTML).replace('Rp', '').replace('.','').replace('.','');
      let weight = (document.querySelector('div.css-bqvohl > dd > p').innerHTML).replace('gr','');
      let etalase = document.querySelector('div.css-1amuqy9.evv6ury0 > span').innerHTML;
      let description = document.querySelector('.css-olztn6-unf-heading.e1qvo2ff8').innerHTML;

      return {
        title,
        price,
        weight,
        etalase,
        description
      };
    });


    await browser.close();
    return item;
}

module.exports = getItem;