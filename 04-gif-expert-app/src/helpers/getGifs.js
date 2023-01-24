import fetch from 'cross-fetch';

export const getGifs = async (category) => {
    const apiKey = 'G6yoHVeYBfmPSpWDIq5GNz0Bh5dnyrjH';
    const getGifUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${category}&limit=10`;
    const resp = await fetch(getGifUrl);
    const {data} = await resp.json();
    return data.map(gif => ({
        id: gif.id,
        title: gif.title,
        url: gif.images.original.url
    }));
}