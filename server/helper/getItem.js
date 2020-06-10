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
      
    const popup = await page.$('div.css-hnnye.ew904gd0');
    const maxLoop = await page.evaluate(() => {
      let contain = document.querySelectorAll('div.css-1muhp5u.ejaoon00');
      return contain.length;
    });

    let image1 = '';
    let image2 = '';
    let image3 = '';
    let image4 = '';
    let image5 = '';

    if (0 <= Number(maxLoop)) {
      image1 = await popup.evaluate( popup => {
        popup.click()
        let image = document.querySelector('img.css-udmgcf').src;
        return image;
      } );
    }
    
    await page.keyboard.press('Escape');
    await page.keyboard.up('Escape');
    // await page.waitForNavigation();
    await page.click('div.css-xwybk > div > div > div:nth-child(2) > div > img');

    const popup2 = await page.$('div.css-hnnye.ew904gd0');

    if (1 <= Number(maxLoop)) {
      image2 = await popup2.evaluate( popup2 => {
        popup2.click()
        let image = document.querySelector('img.css-udmgcf').src;
        return image;
      } );
    }

    image1 !== '' ? item.image1 = image1 : '';
    image2 !== '' ? item.image2 = image2 : '';
    image3 !== '' ? item.image3 = image3 : '';
    image4 !== '' ? item.image4 = image4 : '';
    image5 !== '' ? item.image5 = image5 : '';

    item.maxLoop = maxLoop;

    await browser.close();
    return item;
}

module.exports = getItem;