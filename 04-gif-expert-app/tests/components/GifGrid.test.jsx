import {render, screen} from '@testing-library/react';
import {GifGrid} from '../../src/components';
import {useFetchGifs} from '../../src/hooks/useFetchGifs';

jest.mock('../../src/hooks/useFetchGifs')

describe('Tests for <GifGrid /> component', function() {
    const category = 'Rick and Morty';

    test('Must show the loading on init', () => {
        useFetchGifs.mockReturnValue({
            gifs: [],
            isLoading: true
        });

        render(<GifGrid category={category} />);

        expect( screen.getByText('Loading...') ).toBeTruthy();
        expect( screen.getByText(category) ).toBeTruthy();
    });

    test('Must show items after load images with useFetchGifs', () => {

        const gifs = [
            {
                id: 'ABC',
                title: 'Title1',
                url: 'https://example.com/1'
            },
            {
                id: '123',
                title: 'Title2',
                url: 'https://example.com/2'
            }
        ];

        useFetchGifs.mockReturnValue({
            gifs: gifs,
            isLoading: false
        });
        render(<GifGrid category={category} />);

        expect( screen.getAllByRole('img').length ).toBe(gifs.length);

    });
});