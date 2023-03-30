const axios = require('axios');
const xml2js = require('xml2js');

const getOrcidProfile = async (req, res) => {
    const { orcidId } = req.params;

    try {
        const personResponse = await axios.get(`https://pub.orcid.org/v3.0/${orcidId}/person`);
        const educationsResponse = await axios.get(`https://pub.orcid.org/v3.0/${orcidId}/educations`);
        const worksResponse = await axios.get(`https://pub.orcid.org/v3.0/${orcidId}/works`);

        const parser = new xml2js.Parser();

        const personJson = await parser.parseStringPromise(personResponse.data);
        const educationsJson = await parser.parseStringPromise(educationsResponse.data);
        const worksJson = await parser.parseStringPromise(worksResponse.data);

        res.json({
            person: personJson,
            educations: educationsJson,
            works: worksJson
        });
    } catch (error) {
        console.error('Error fetching ORCID profile:', error);
        res.status(500).json({ message: 'Error fetching ORCID profile' });
    }
};

module.exports = { getOrcidProfile };
