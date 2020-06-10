const getCategories = require('../helper/getCategories');
const getList = require('../helper/getList');
const getItem = require('../helper/getItem');
const test = require('../helper/test');

class ControllerData {
    static async getCategories(req, res) {
        // const url = 'https://www.tokopedia.com/pusatvalve';
        const url = req.body.link;
        const categories = await getCategories(url);
        res.status(200).json({ categories });
    }

    static async getList(req, res) {
        try {
            // const url = 'https://www.tokopedia.com/pusatvalve/etalase/sandking';
            const url = req.body.link;
            const list = await getList(url);
            res.status(200).json({ list });
        } catch (error) {
            console.log(error)
        }
    }

    static async getItem(req, res) {
        try {
            // const url = 'https://www.tokopedia.com/pusatvalve/true-union-ball-2-valve-pvc-socket-npt-1';
            const url = req.body.link;
            const item = await getItem(url);
            res.status(200).json({ item });
        } catch (error) {
            console.log(error)
        }
    }

    static async getItemByList(req, res) {
        try {
            // const url = 'https://www.tokopedia.com/pusatvalve/etalase/sandking';
            const url = req.body.link;
            const list = await getList(url);
            let temp = [];
            for (let i = 0; i < list.length; i++) {
                let result = await getItem(list[i].linkItem);
                temp.push(result);
            }
            
            res.status(200).json(temp);
        } catch (error) {
            console.log(error)
        }
    }

    static gettest(req,res) {
        // const url = 'https://www.tokopedia.com/pusatvalve/true-union-ball-2-valve-pvc-socket-npt-1';
        const url = req.body.link;
        const result = test(url);
        res.status(200).json(result);
    }
}

module.exports = ControllerData;