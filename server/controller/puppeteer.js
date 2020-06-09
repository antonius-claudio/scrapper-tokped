const puppeteer = require('puppeteer');
async function getTokoPedia(link) {
  const browser = await puppeteer.launch({ headless: false }); // for test disable the headlels mode,
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.setViewport({ width: 1000, height: 926 });
  await page.goto(`${link}`, {
    waitUntil: 'networkidle2',
  });

  /** @type {string[]} */
  const productsLink = await page.evaluate(() => {

    const containPage = document.querySelectorAll(
      '#zeus-root > div > div.css-1geyxdk > div.css-a6gim0 > aside.css-1dify21 > div > div > div > div > ul > li.css-z2vy7e'
    );
    const products = [];
    containPage.forEach((element) => {

      const category = element.querySelector('a').textContent;
      const linkCategory = element.querySelector('li[class="css-z2vy7e"] > a').href;
      let index = 0;
      if (category != null && category != 'Produk Terjual' && category != 'Preorder' || category === '1PC BODY BALL VALVE SANKYO' || category === '2PC BODY BALL VALVE SANKYO') {
        products.push({ category, linkCategory });
      }
    });
    return products;
  });
  await page.close();

  const pdfs = productsLink.map(async (product, i) => {
    const page2 = await browser.newPage();

    console.log(`loading page: ${product.linkCategory}`);
    await page2.goto(product.linkCategory, {
      waitUntil: 'networkidle2'
    });
    await page2.setViewport({ width: 1000, height: 926 });
    await page2.bringToFront();
    await page2.screenshot({path:'test.png'})


    await page2.close();
    Promise.all(pdfs).then(() => {
      browser.close();
    });
  });

  return productsLink;
}

module.exports = getTokoPedia;

// async () => {
          //   const pageCategory = await browser.newPage();
          //   await pageCategory.setDefaultNavigationTimeout(0);
          //   await pageCategory.setViewport({ width: 1000, height: 926 });
          //   await pageCategory.goto(`${linkCategory}`, {
          //     waitUntil: 'networkidle2',
          //   });
          //   await pageCategory.evaluate(() => {
          //     const containCategoryPage = document.querySelectorAll(
          //       '#zeus-root > div > div.css-1geyxdk > div.css-a6gim0 > div.css-19deanw > div.css-yxh0dp'
          //     );
          //     let linkItems = [];
          //     containCategoryPage.forEach((i) => {
          //       const items = i.querySelector('a').href;
          //       linkItems.push(items);
          //     })
          //     products[index].items = linkItems;
          //   })
          //   index++;
          // }