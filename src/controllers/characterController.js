const fetch = require('node-fetch')

const API = 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=8ddf04f2b37b8e5a398c31e738bae8c9&hash=3ba4efd71f7cfcb0badea8c0c22c74b3';

module.exports = async (req, res) => {
    try {
        const response = await fetch(API)
        const data = await response.json()
        const characters = data.data.results( )

        return res.render('index', {
            characters
        })

    } catch (error) {
        console.log(error);
    }
}