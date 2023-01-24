import {useFetchGifs} from '../../src/hooks/useFetchGifs';
import {renderHook, waitFor} from '@testing-library/react';

describe('Tests for useFetchGifs hook', function() {

    test('Must return the initial state', () => {
        const {result} = renderHook( () => useFetchGifs('Rick and Morty') );
        const {gifs, isLoading} = result.current;
        expect(gifs.length).toBe(0);
        expect(isLoading).toBeTruthy();
    });

    test('Must return an array of gifs and isLoading = false', async() => {
        const {result} = renderHook( () => useFetchGifs('Rick and Morty') );
        await waitFor(
            () => expect( result.current.gifs.length ).toBeGreaterThan(0),
            {timeout: 5000}
        );

        const {gifs, isLoading} = result.current;

        expect(gifs.length).toBeGreaterThan(0);
        expect(isLoading).toBeFalsy();
    });
});