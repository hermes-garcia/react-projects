import {getGifs} from '../../src/helpers/getGifs';

describe('Tests for getGifs helper', function() {

    test('Must return an array of gifs with id, title & url each', async() => {
        const gifs = await getGifs('Homer');
        expect(gifs.length).toBeGreaterThan(0);
        expect(gifs[0]).toEqual({
            id: expect.any(String),
            title: expect.any(String),
            url: expect.any(String)
        });
    });
});