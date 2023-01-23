import {getHeroById, getHeroesByOwner} from "../../src/base-pruebas/08-imp-exp.js";

describe('Tests for 08-imp-exp file', function () {
    test('getHeroById must return a hero by id', () =>{
        const id = 3;
        const hero = getHeroById(id);

        expect(hero).toEqual({id: 3, name: 'Superman', owner: 'DC'});
        expect(hero).toEqual({id: 3, name: 'Superman', owner: 'DC'});
    });

    test('getHeroById must return undefined if not exists', () =>{
        const id = 100;
        const hero = getHeroById(id);

        expect(hero).toBeFalsy();
    });


    test('getHeroByOwner must return DC heroes with length === 3', () =>{
        const owner = 'DC';
        const heroes = getHeroesByOwner(owner);
        expect(heroes).toEqual(heroes.filter( (hero) => hero.owner === owner ));
        expect(heroes).toHaveLength(3);
    });


    test('getHeroByOwner must return Marvel heroes with length === 2', () =>{
        const owner = 'Marvel';
        const heroes = getHeroesByOwner(owner);
        expect(heroes).toEqual(heroes.filter( (hero) => hero.owner === owner ));
        expect(heroes).toHaveLength(2);
    });
});