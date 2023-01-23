import {getUser, getUsuarioActivo} from '../../src/base-pruebas/05-funciones.js';

describe('Test for 05-funciones file', function () {
    test('getUser must return an object', () => {
        const testUser = {
            uid: 'ABC123',
            username: 'El_Papi1502'
        };
        const user = getUser();
        expect(user).toEqual(testUser);
    });

    test('getUsuarioActivo must return an object',() => {
        const name = 'Hermes';
        const user = getUsuarioActivo(name);

        expect(user).toStrictEqual({
            uid: 'ABC567',
            username: name
        });
    })
});