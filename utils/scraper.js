const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const brand = ["marvel", "star-wars", "power-rangers", "transformers"];

const fetchData = async (br) => {
    try {
        const { data } = await axios.get(`https://hasbropulse.com/collections/${br}`);
        const $ = cheerio.load(data);

        const productList = $('ol.ais-Hits-list > li.ais-Hits-item').map((index, element) => {
            const product = {};
            product.title = $(element).find('.ais-hit--title > a').text().trim();
            product.price = Math.ceil(Math.random() * (2000 - 300) + 300);
            product.stock = Math.ceil(Math.random() * (150 - 50) + 50);
            product.image = $(element).find('img.ais-hit--image').attr('data-src');
            product.category = 'Action Figures';
            product.brand = br;
            return product;
        }).get();

        return productList;
    } catch (error) {
        console.log(error);
    }
};

const fetchAllData = async () => {
    try {
        const promises = brand.map(br => fetchData(br));
        const results = await Promise.all(promises);
        const productList = results.flat();
        const fileData = `const data = ${JSON.stringify(productList, null, 2)};\n\nmodule.exports = data;\n`;

        fs.writeFile('data.js', fileData, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    } catch (error) {
        console.log(error);
    }
};

fetchAllData();