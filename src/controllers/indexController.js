const fetch = require('node-fetch');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const {characterSearch} = require('../services/search.services')

const TIMESTAMP = '1';
const API_BASE = 'https://gateway.marvel.com/v1/public/characters';
const API_KEY = '8ddf04f2b37b8e5a398c31e738bae8c9';
const HASH = '3ba4efd71f7cfcb0badea8c0c22c74b3';
//Para obtener el HASH es juntar TIMESTAMP, key publica y key privada en un md5 generator

//const API = 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=8ddf04f2b37b8e5a398c31e738bae8c9&hash=3ba4efd71f7cfcb0badea8c0c22c74b3';
const API_URL = `${API_BASE}?ts=${TIMESTAMP}&apikey=${API_KEY}&hash=${HASH}`

const controller = {
    index: async (req, res) => {
    const limit = 20; // Número de resultados por página
    const page = parseInt(req.query.page) || 1; // Página actual (por defecto la página 1)
    const offset = (page - 1) * limit; // Cálculo del offset

    const API = `${API_URL}&limit=${limit}&offset=${offset}`;

    try {
        const response = await fetch(API);
        const data = await response.json();

        if (data && data.data && data.data.results) {
            const characters = data.data.results;
            const totalResults = data.data.total; // Total de resultados
            const totalPages = Math.ceil(totalResults / limit); // Total de páginas

            return res.render('index', {
                characters,
                currentPage: page,
                totalPages: totalPages
                });
        }

    } catch (error) {
        console.error(error);
    }
},

search:async (req, res) => {
    try {
        const API = `${API_URL}`
        const allCharacters = await characterSearch(API);
        const results = allCharacters.filter(character =>
            character.name.toLowerCase().includes(req.query.keywords.toLowerCase()));
            
            return res.render('results', {
                results,
                toThousand,
                keywords: req.query.keywords
            });
        

    } catch (error) {
        console.log(error);
    }
},
}

module.exports = controller