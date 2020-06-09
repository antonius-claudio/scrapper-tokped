const getCategories = require('../helper/getCategories');
const getList = require('../helper/getList');

class ControllerData {
    static async getCategories(req, res) {
        const url = 'https://www.tokopedia.com/pusatvalve';
        const categories = await getCategories(url);
        res.status(200).json({ categories });
    }

    static async getList(req, res) {
        const url = 'https://www.tokopedia.com/pusatvalve/etalase/1pc-body-ball-valve-sankyo';
        const list = await getList(url);
        res.status(200).json({ list });
    }

    static async getItem(req, res) {
        const url = 'https://www.tokopedia.com/pusatvalve/1-2-inch-ball-valve-sankyo-mojekerto';
        const item = await getItems(url);
        res.status(200).json({ item });
    }
}

module.exports = ControllerData;