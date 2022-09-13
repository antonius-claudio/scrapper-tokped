const puppeteer = require('puppeteer');
const scrollPageToBottom =  require('puppeteer-autoscroll-down');

async function getItem(link) {
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
      let title = document.querySelector('h1[data-testid="lblPDPDetailProductName"]').innerHTML;
      let price = String(document.querySelector('div[data-testid="lblPDPDetailProductPrice"]').innerHTML).replace('Rp', '').replace('.','').replace('.','');
      // let weight = (document.querySelector('p[data-testid="PDPDetailWeightValue"]').innerHTML).replace('gr','');
      let weight = (document.querySelector("#pdp_comp-product_detail > div:nth-child(2) > div:nth-child(2) > ul > li:nth-child(2) > span.main").innerHTML).replace('gr','');
      // let etalase = document.querySelector('p[data-testid="PDPDetailShowcaseValue"] > div > div > span').innerHTML;
      let etalase = document.querySelector("#pdp_comp-product_detail > div:nth-child(2) > div:nth-child(2) > ul > li:nth-child(4) > a > b").innerHTML;
      let description = document.querySelector('div[data-testid="lblPDPDescriptionProduk"]').innerHTML;

      return {
        title,
        price,
        weight,
        etalase,
        description
      };
    });
    
    // klik tempat popup
    let popup = await page.$('div[data-testid="PDPImageMain"] > div');
    
    const maxLoop = await page.evaluate(() => {
      // thumbnail list sebelum popup
      let contain = document.querySelectorAll('div.css-1bl416v > div[data-testid="listPDPSlider"] > div > div');
      return contain.length;
    });

    let image1 = '';
    let image2 = '';
    let image3 = '';
    let image4 = '';
    let image5 = '';

    if (0 < Number(maxLoop)) {
      image1 = await popup.evaluate( popup => {
        popup.click()
        let image = document.querySelector('img[data-testid="PDPImageDetail"]').src;
        return image;
      } );
    }
    
    if (1 < Number(maxLoop)) {
      page.on('dialog', async popup => {
        await popup.dismiss();
      });
      await page.evaluate(() => {
        // document.querySelector('div.css-xwybk > div > div > div:nth-child(2) > div').click();
        document.querySelectorAll('div[data-testid="PDPImageThumbnail"]:nth-child(2)').click();
      });

      popup = await page.$('div[data-testid="PDPImageMain"] > div');
  
      image2 = await popup.evaluate( popup => {
        popup.click()
        let image = document.querySelector('img[data-testid="PDPImageDetail"]').src;
        return image;
      } );
    }

    if (2 < Number(maxLoop)) {
      page.on('dialog', async popup => {
        await popup.dismiss();
      });
      await page.evaluate(() => {
        // document.querySelector('div.css-xwybk > div > div > div:nth-child(3) > div').click();
        document.querySelectorAll('div[data-testid="PDPImageThumbnail"]:nth-child(3)').click();
      });
  
      popup = await page.$('div[data-testid="PDPImageMain"] > div');

      image3 = await popup.evaluate( popup => {
        popup.click()
        let image = document.querySelector('img[data-testid="PDPImageDetail"]').src;
        return image;
      } );
    }

    if (3 < Number(maxLoop)) {
      page.on('dialog', async popup => {
        await popup.dismiss();
      });
      await page.evaluate(() => {
        // document.querySelector('div.css-xwybk > div > div > div:nth-child(4) > div').click();
        document.querySelectorAll('div[data-testid="PDPImageThumbnail"]:nth-child(4)').click();
      });
  
      popup = await page.$('div[data-testid="PDPImageMain"] > div');

      image4 = await popup.evaluate( popup => {
        popup.click()
        let image = document.querySelector('img[data-testid="PDPImageDetail"]').src;
        return image;
      } );
    }

    if (4 < Number(maxLoop)) {
      page.on('dialog', async popup => {
        await popup.dismiss();
      });
      await page.evaluate(() => {
        // document.querySelector('div.css-xwybk > div > div > div:nth-child(5) > div').click();
        document.querySelectorAll('div[data-testid="PDPImageThumbnail"]:nth-child(5)').click();
      });
  
      popup = await page.$('div[data-testid="PDPImageMain"] > div');

      image5 = await popup.evaluate( popup => {
        popup.click()
        let image = document.querySelector('img[data-testid="PDPImageDetail"]').src;
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