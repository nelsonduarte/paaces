const axios = require('axios');
const cheerio = require('cheerio');

const getUserInfo = async (req, res) => {
    try {
        const cvUrl = req.query.cvUrl;

        if (!cvUrl) {
            return res.status(400).json({ error: 'Missing cvUrl query parameter' });
        }

        const response = await axios.get(cvUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
            }
        });

        response = await axios.get(cvUrl);
        const htmlData = response.data;

        // Carregue os dados HTML no Cheerio
        const $ = cheerio.load(htmlData);

        // Selecione e processe os dados do usuário
        const userInfo = processUserInfo($);

        res.status(200).json(userInfo);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from CienciaVitae' });
    }
};

const processUserInfo = ($) => {
    // Selecione e processe as informações do usuário
    const fullName = $('div.cv-profile-fullname').text().trim();
    const currentAffiliation = $('div.cv-profile-affiliation').text().trim();
    const biography = $('div.cv-profile-biography').text().trim();

    const educationItems = [];
    $('div.cv-educations div.cv-education').each((index, element) => {
        const institution = $(element).find('.cv-education-institution').text().trim();
        const degree = $(element).find('.cv-education-degree').text().trim();
        const startDate = $(element).find('.cv-education-start').text().trim();
        const endDate = $(element).find('.cv-education-end').text().trim();

        educationItems.push({
            institution,
            degree,
            startDate,
            endDate
        });
    });

    const userInfo = {
        fullName,
        currentAffiliation,
        biography,
        education: educationItems,
    };

    return userInfo;

};
module.exports = {
    getUserInfo,
};
