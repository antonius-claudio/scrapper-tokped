const getCategories = require('../helper/getCategories');
const getList = require('../helper/getList');
const getItem = require('../helper/getItem');
const test = require('../helper/test');

class ControllerData {
    static async getCategories(req, res) {
        // const url = 'https://www.tokopedia.com/pusatvalve';
        let url = req.body.linkUrl;
        const categories = await getCategories(url);
        res.status(200).json({ categories });
    }

    static async getList(req, res) {
        try {
            // const url = 'https://www.tokopedia.com/pusatvalve/etalase/sandking';
            let url = req.body.linkUrl;
            const list = await getList(url);
            res.status(200).json({ list });
        } catch (error) {
            console.log(error)
        }
    }

    static async getItem(req, res) {
        try {
            // const url = 'https://www.tokopedia.com/pusatvalve/true-union-ball-2-valve-pvc-socket-npt-1';
            let url = req.body.linkUrl;
            const item = await getItem(url);
            res.status(200).json({ item });
        } catch (error) {
            console.log(error)
        }
    }

    static async getItemByList(req, res) {
        try {
            // console.log('masuk controller', req.body.linkUrl)
            // const url = 'https://www.tokopedia.com/pusatvalve/etalase/sandking';
            // console.log('masuk controller')
            let url = req.body.linkUrl;
            console.log('masuk controller', req.body.linkUrl)
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

    static async getItemByStore(req, res) {
        try {
            let url = req.body.linkUrl;
            const categories = await getCategories(url);
            let temp = [];
            
            for (let j = 0; j < categories.length; j++) {
                let list = await getList(categories[j].linkCategory);
                for (let i = 0; i < list.length; i++) {
                    let result = await getItem(list[i].linkItem);
                    temp.push(result);
                }
            }
            
            res.status(200).json(temp);
        } catch (error) {
            console.log(error)
        }
    }

    static gettest(req,res) {
        // const url = 'https://www.tokopedia.com/pusatvalve/true-union-ball-2-valve-pvc-socket-npt-1';
        let url = req.body.linkUrl;
        const result = test(url);
        res.status(200).json(result);
    }
}

module.exports = ControllerData;