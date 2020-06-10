const getCategories = require('../helper/getCategories');
const getList = require('../helper/getList');
const getItem = require('../helper/getItem');

class ControllerData {
    static async getCategories(req, res) {
        const url = 'https://www.tokopedia.com/pusatvalve';
        const categories = await getCategories(url);
        res.status(200).json({ categories });
    }

    static async getList(req, res) {
        try {
            const url = 'https://www.tokopedia.com/pusatvalve/etalase/sandking';
            const list = await getList(url);
            res.status(200).json({ list });
        } catch (error) {
            console.log(error)
        }
    }

    static async getItem(req, res) {
        try {
            const url = 'https://www.tokopedia.com/pusatvalve/globe-valve-kitz-3-100-kuningan-100-asli';
            // const url = 'https://www.tokopedia.com/pusatvalve/1-2-inch-ball-valve-sankyo-mojekerto';
            // const url = 'https://www.tokopedia.com/pusatvalve/y-strainer-kitz-2-kuningan-100-asli';
            const item = await getItem(url);
            res.status(200).json({ item });
        } catch (error) {
            console.log(error)
        }
    }

    static async getItemByList(req, res) {
        try {
            const url = 'https://www.tokopedia.com/pusatvalve/etalase/sandking';
            const list = await getList(url);
            let temp = [];
            for (let i = 0; i < list.length; i++) {
                let result = await getItem(list[i].linkItem);
                temp.push(result);
            }
            
            // let temp1 = await getItem(list[0].linkItem);
            // let temp2 = await getItem(list[1].linkItem);
            // temp.push(temp1);
            // temp.push(temp2);
            res.status(200).json(temp);
        } catch (error) {
            console.log(error)
        }

        // async function getResult (link) {
        //     let result = await getItem(link);
        //     return result;
        // }

        // list.forEach((i) => {
        //     temp.push(getResult(i.linkItem));
        // })

    }
}

module.exports = ControllerData;