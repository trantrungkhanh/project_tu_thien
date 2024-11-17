const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const router = express.Router();
require('dotenv').config();

router.post('/', async (req, res) => {

    try {
        const { data } = await axios.get('https://nhandan.vn/ngap-lut-tag1663.html');
        const $ = cheerio.load(data);

        const articles = [];

        // Trích xuất thông tin từ các bài viết
        $('.story').each((i, element) => {
            const title = $(element).find('h3').text();
            const link = $(element).find('a').attr('href');
            const summary = $(element).find('.story__summary').text();
            const thumbnail = $(element).find('.story__thumb').find('a').find('img').attr('data-src');
            if (summary !== '' || summary) {
                articles.push({ title, link, summary, thumbnail});
            }
            
        });

        res.json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

module.exports = router;