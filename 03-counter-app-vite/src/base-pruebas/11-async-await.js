export const getImage = async() => {
    try {
        const apiKey = 'G6yoHVeYBfmPSpWDIq5GNz0Bh5dnyrjH';
        const resp   = await fetch(`http://api.giphy.com/v1/gifs/random?api_key=${ apiKey }`);
        const { data } = await resp.json();
        const { url } = data.images.original;

        return url;
    } catch (error) {
        return 'No se encontró la imagen';
    }
}
