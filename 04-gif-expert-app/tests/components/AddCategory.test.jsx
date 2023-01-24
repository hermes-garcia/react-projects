import {fireEvent, render, screen} from '@testing-library/react';
import {AddCategory} from '../../src/components';

describe('Tests for <AddCategory /> component', function() {

    test('Must change input value', () => {
        render(<AddCategory onNewCategory={() => {}} />);
        const input = screen.getByRole('textbox');

        fireEvent.input(input, { target: {value: 'Goku'} });

        expect(input.value).toBe('Goku');
    });

    test('Must call onNewCategory if input have some value', () => {
        const inputValue = 'Goku';
        const onNewCategory = jest.fn();

        render(<AddCategory onNewCategory={onNewCategory} />);
        const form = screen.getByRole('form');
        const input = screen.getByRole('textbox');

        fireEvent.input(input, { target: {value: inputValue} });
        fireEvent.submit(form);

        expect(input.value).toBe('');
        expect( onNewCategory ).toHaveBeenCalled();
        expect( onNewCategory ).toHaveBeenCalledTimes(1);
        expect( onNewCategory ).toHaveBeenCalledWith(inputValue);

    });

    test('Must not call onNewCategory if input is empty', () => {
        const onNewCategory = jest.fn();

        render(<AddCategory onNewCategory={onNewCategory} />);
        const form = screen.getByRole('form');

        fireEvent.submit(form);

        expect( onNewCategory ).toHaveBeenCalledTimes(0);
    });
});