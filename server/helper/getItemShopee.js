const puppeteer = require('puppeteer');
const scrollPageToBottom =  require('puppeteer-autoscroll-down');

async function getItemShopee(link) {
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
    
    let item = await page.evaluate(() => {
      let title = document.querySelector('#main > div > div:nth-child(3) > div._8mC2ei > div > div.page-product > div.container > div.product-briefing.flex.card._2qM0Iy > div.flex.flex-auto.eTjGTe > div > div._2rQP1z > span').innerHTML;
      let price = String(document.querySelector('#main > div > div:nth-child(3) > div._8mC2ei > div > div.page-product > div.container > div.product-briefing.flex.card._2qM0Iy > div.flex.flex-auto.eTjGTe > div > div:nth-child(3) > div > div > div > div > div > div').innerHTML).replace('Rp', '').replace('.','').replace('.','');
      let backgroundImage = document.querySelector('#main > div > div:nth-child(3) > div._8mC2ei > div > div.page-product > div.container > div.product-briefing.flex.card._2qM0Iy > div.jexb7x > div.flex.flex-column > div.Ki_iE3 > div > div._3iW6K2 > div');
      if (backgroundImage) {
        var style = window.getComputedStyle ? getComputedStyle(backgroundImage, null) : backgroundImage.currentStyle;
        backgroundImage = style.backgroundImage.split(`"`)[1];
      } else {
        backgroundImage = document.querySelector('head > meta[property="og:image"]').content;
      }

      let description = document.querySelector('#main > div > div:nth-child(3) > div._8mC2ei > div > div.page-product > div.container > div.CKGyuW > div.page-product__content > div.page-product__content--left > div.product-detail.page-product__detail > div:nth-child(2) > div._2jz573 > div > p').innerHTML;

      return {
        title,
        price,
        backgroundImage,
        description,
      };
    });
    
    await browser.close();
    return item;
}

module.exports = getItemShopee;