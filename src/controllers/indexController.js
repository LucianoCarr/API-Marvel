const fetch = require('node-fetch');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const API_BASE = 'https://gateway.marvel.com/v1/public/characters';
const API_KEY = '8ddf04f2b37b8e5a398c31e738bae8c9';
const HASH = '3ba4efd71f7cfcb0badea8c0c22c74b3';
const TIMESTAMP = '1';

//const API = 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=8ddf04f2b37b8e5a398c31e738bae8c9&hash=3ba4efd71f7cfcb0badea8c0c22c74b3';
const API_key = `${API_BASE}?ts=${TIMESTAMP}&apikey=${API_KEY}&hash=${HASH}`

const controller = {
    index: async (req, res) => {
    const limit = 20; // Número de resultados por página
    const page = parseInt(req.query.page) || 1; // Página actual (por defecto la página 1)
    const offset = (page - 1) * limit; // Cálculo del offset

    const API = `${API_key}&limit=${limit}&offset=${offset}`;

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
    const limit = 20
    let allCharacters = []

    try {
        
        for (let offset = 0; offset < 150; offset+= limit) {
            
        const API = `${API_key}&limit=${limit}&offset=${offset}`;
        
        const response = await fetch(API)
        const data = await response.json();
        
        if (data && data.data && data.data.results) {
            allCharacters = allCharacters.concat(data.data.results);
        } else {
            break;
        }
    }

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


//Hacer un service con esta funcion y llamarlo

/* let cachedCharacters = [];
let cacheTime = 0;

const fetchAllCharacters = async () => {
    // Si los datos en caché tienen menos de 24 horas, devuélvelos
    if (Date.now() - cacheTime < 24 * 60 * 60 * 1000) {
        return cachedCharacters;
    }

    // Si no, actualiza la caché
    let allCharacters = [];
    const limit = 20;

    for (let offset = 0; offset < 1560; offset += limit) {
        const API = `${API_key}&limit=${limit}&offset=${offset}`;
        const response = await fetch(API);
        const data = await response.json();
        
        if (data && data.data && data.data.results) {
            allCharacters = allCharacters.concat(data.data.results);
        } else {
            break;
        }
    }

    cachedCharacters = allCharacters;
    cacheTime = Date.now();
    return allCharacters;
};

search: async (req, res) => {
    try {
        const allCharacters = await fetchAllCharacters();
        const keywords = req.query.keywords.toLowerCase();
        const results = allCharacters.filter(character =>
            character.name.toLowerCase().includes(keywords)
        );

        return res.render('results', {
            results,
            toThousand,
            keywords: req.query.keywords
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send('Error al buscar personajes.');
    }
};
 */