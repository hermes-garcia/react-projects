import {getSaludo} from '../../src/base-pruebas/02-template-string.js';

describe('Test for 02-template-string file', function () {
    test('getSaludo must return "Hola Hermes"', () => {
        const name = 'Hermes';
        const message = getSaludo(name);

        expect(message).toBe(`Hola ${name}`);
    });
});