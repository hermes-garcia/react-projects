import {useCounter} from '../../hooks';
import {renderHook} from '@testing-library/react';

describe('Tests for useCounter hook', function() {
    test('should return default values', () => {
        const {result} = renderHook( () => useCounter() );
        const {counter, increment, decrement, reset} = result.current;

        expect(counter).toBe(10);
        expect(increment).toEqual(expect.any(Function));
        expect(decrement).toEqual(expect.any(Function));
        expect(reset).toEqual(expect.any(Function));
    });

    test('should return counter value = 100', () => {
        const {result} = renderHook( () => useCounter(100) );

        expect(result.current.counter).toBe(100);
    });
});