const getTokopedia = require('./puppeteer');

class ControllerData {
    static async getItems(req, res) {
        const url = 'https://www.tokopedia.com/pusatvalve';
        const test = await getTokopedia(url);
        res.status(200).json({data: test});
    }
}

module.exports = ControllerData;