import {retornaArreglo} from "../../src/base-pruebas/07-deses-arr.js";

describe('Test for 07-deses-arr file', function () {
    test('retornaArreglo must return a string and a number', () => {
        const [letters, numbers] = retornaArreglo();
        expect(letters).toBe('ABC');
        expect(letters).toEqual(expect.any(String));
        expect(numbers).toBe(123);
        expect(numbers).toEqual(expect.any(Number));
    });
});