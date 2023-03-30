// Importa os módulos necessários: axios para fazer solicitações HTTP e xml2js para converter dados XML em JSON
const axios = require('axios');
const xml2js = require('xml2js');
const OrcidProfile = require('../models/OrcidProfile');

// Define uma função assíncrona getOrcidProfile que aceita uma requisição e resposta
const getOrcidProfile = async (req, res) => {
    // Extrai o ID do ORCID dos parâmetros da requisição
    const { orcidId } = req.params;

    try {
        // Faz três solicitações HTTP GET separadas para obter informações sobre a pessoa, formações acadêmicas e trabalhos usando o ID do ORCID
        const personResponse = await axios.get(`https://pub.orcid.org/v3.0/${orcidId}/person`);
        const educationsResponse = await axios.get(`https://pub.orcid.org/v3.0/${orcidId}/educations`);
        const worksResponse = await axios.get(`https://pub.orcid.org/v3.0/${orcidId}/works`);

        // Cria uma nova instância do parser xml2js
        const parser = new xml2js.Parser();

        // Converte os dados XML recebidos em JSON usando o parser xml2js
        const personJson = await parser.parseStringPromise(personResponse.data);
        const educationsJson = await parser.parseStringPromise(educationsResponse.data);
        const worksJson = await parser.parseStringPromise(worksResponse.data);

        // Envia a resposta com os dados JSON convertidos
        res.json({
            person: personJson,
            educations: educationsJson,
            works: worksJson
        });
    } catch (error) {
        // Registra o erro no console e envia uma resposta de erro com o status 500
        console.error('Error fetching ORCID profile:', error);
        res.status(500).json({ message: 'Error fetching ORCID profile' });
    }
};

const saveOrcidProfileToDb = async (orcidId, personJson, educationsJson, worksJson) => {
    try {
        // Verificar se o perfil ORCID já existe na base de dados
        let orcidProfile = await OrcidProfile.findOne({ orcidId });

        if (orcidProfile) {
            // Atualizar o perfil existente
            orcidProfile.person = personJson;
            orcidProfile.educations = educationsJson;
            orcidProfile.works = worksJson;
            console.log('Atualizando o perfil ORCID existente na base de dados');
        } else {
            // Criar um novo perfil
            orcidProfile = new OrcidProfile({
                orcidId,
                person: personJson,
                educations: educationsJson,
                works: worksJson,
            });
            console.log('Criando um novo perfil ORCID na base de dados');
        }

        // Salvar o perfil (criado ou atualizado)
        await orcidProfile.save();
        console.log('OrcidProfile salvo com sucesso na base de dados');
    } catch (error) {
        console.error('Erro ao salvar o OrcidProfile na base de dados:', error);
    }
};


// Exporta a função getOrcidProfile para ser usada em outros arquivos
module.exports = { getOrcidProfile };
