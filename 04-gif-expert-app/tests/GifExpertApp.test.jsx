import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {GifExpertApp} from '../src/GifExpertApp';
jest.setTimeout(30000)
describe('Tests for <GiftExpertApp /> component', function() {

    test('Must call handleAddCategory function', async() => {
        render( <GifExpertApp />);
        const input = screen.getByRole('textbox');
        const form = screen.getByRole('form');
        fireEvent.input(input,{target: {value: 'Star Wars'}});
        fireEvent.submit(form);
        await waitFor(
            () => expect(screen.getAllByRole('heading',{level: 3}).length).toBe(2),
            {timeout:10000}
        );
        //screen.debug()
        //TODO fix test to cover handleAddCategory function
    });
});