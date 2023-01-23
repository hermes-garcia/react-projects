import {getImage} from '../../src/base-pruebas/11-async-await.js';

describe('Test for 11-async-await file', function () {
    test('getImage must return an image url', async() => {
        const url = await getImage();
        expect(typeof url).toBe('string');
    });
});