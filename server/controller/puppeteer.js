const puppeteer = require('puppeteer');
async function getTokoPedia(item) {
  let processedItem = item.split(' ').join('%20');
  const browser = await puppeteer.launch({ headless: false }); // for test disable the headlels mode,
  const page = await browser.newPage();

  await page.setDefaultNavigationTimeout(0);

  await page.setViewport({ width: 1000, height: 926 });
  await page.goto(`${processedItem}`, {
    waitUntil: 'networkidle2',
  });

  /** @type {string[]} */
  const productNames = await page.evaluate(() => {
    const div = document.querySelectorAll(
      '#zeus-root > div > div.css-1geyxdk > div.css-a6gim0 > aside.css-1dify21 > div > div > div > div > ul > li.css-z2vy7e'
    //   '#zeus-root > div > div.css-1geyxdk > div.css-a6gim0 > aside.css-1dify21 > div > div > div > div > ul > li.css-z2vy7e'
    //   '#zeus-root > div > div.css-jau1bt > div > div.css-rjanld > div.css-jza1fo > div.css-1g20a2m'
    );
    console.log('divvvv', div);
    const productnames = [];
    console.log('productnames first', productnames);
    div.forEach((element) => {
        console.log('divvv', element)
        const category = element.querySelector('a').textContent;
    //   const titleelem = element.querySelector('.css-1bjwylw').textContent;
    //   const priceitem = element.querySelector('.css-1beg0o7').textContent;
      if (category != null) {
        productnames.push({
            category: category,
        });
      }
    });
    // titleelem != null &&
    return productnames;
  });

  // console.log(productNames);
  browser.close();
  return productNames;
}

// export default getTokoPedia;
module.exports = getTokoPedia;