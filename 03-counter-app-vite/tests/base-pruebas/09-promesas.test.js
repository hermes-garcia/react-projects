import {getHeroByIdAsync} from "../../src/base-pruebas/09-promesas.js";

describe('Tests for 09-promesas file', function () {
    test('getHeroByIdAsync must return a hero', async() => {
        const id = 1;

        // getHeroByIdAsync(id).then( hero => {
        //     expect(hero).toEqual({ id: 1, name: 'Batman', owner: 'DC' });
        //     done();
        // });

        const hero = await getHeroByIdAsync(id);
        expect(hero).toEqual({ id: 1, name: 'Batman', owner: 'DC' });
    });

    test('getHeroByIdAsync must got an error if hero not exists', async() => {
        const id = 100;

        // getHeroByIdAsync(id).catch( error => {
        //     expect(error).toBe(`No se pudo encontrar el héroe ${id}`)
        //     done();
        // });

        try {
            const hero = await getHeroByIdAsync(id);
        }catch (error) {
            expect(error).toBe(`No se pudo encontrar el héroe ${id}`)
        }
    });
});