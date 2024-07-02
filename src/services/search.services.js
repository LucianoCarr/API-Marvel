let cachedCharacters = [];
let cacheTime = 0;
const limit = 100;
const cacheDuration = 7 * 24 * 60 * 60 * 1000  // 7 dias
const characterTotal = 1563

const characterSearch = async (API_URL) => {
    //tiempo del cache
    if (Date.now() - cacheTime < cacheDuration) {
        return cachedCharacters;
    }

    let allCharacters = [];

    try {
        //bucle para recorrer todos los personajes
        for (let offset = 0; offset < characterTotal; offset += limit) {
            const API = `${API_URL}&limit=${limit}&offset=${offset}`;
            const response = await fetch(API);
            const data = await response.json();
            
            //pedidos de datos de la API (data."algo")
            if (data && data.data && data.data.results) {
                allCharacters = allCharacters.concat(data.data.results);
            } else {
                break;
            }
        }
//asignacion de valores de personajes y cache
        cachedCharacters = allCharacters;
        cacheTime = Date.now();
        return allCharacters;
        
    } catch (error) {
        console.log();
    }
}


module.exports = { characterSearch };