const puppeteer = require('puppeteer')


async function test (link) {
    const PAGE_URL = link // the page to scrap the images from
    
    const browser = puppeteer.launch({
        headless: true
    });
    const page = await (await browser).newPage()

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
    await page.setViewport({ width: 960, height: 768 });

    await page.goto(PAGE_URL, {
        timeout: 60000
    })

    const scrappedImages = await page.evaluate(async () => {
        const asyncSleep = (ms) => new Promise((rs, _) => setTimeout(rs, ms))

        const images = []

        for (const eachThumbnail of document.querySelectorAll("div[data-testid='PDPImageThumbnail'] > div > img")) {
            await eachThumbnail.click()

            let imageSrc = document.querySelector("div[data-testid='PDPImageMain'] > div > div > img").src

            while (images.includes(imageSrc) || imageSrc.startsWith('data:')) {
                imageSrc = document.querySelector("div[data-testid='PDPImageMain'] > div > div > img").src;
                await asyncSleep(1000)
            }

            images.push(imageSrc)
        }

        return images
    })

    console.log(scrappedImages)

}

module.exports = test;