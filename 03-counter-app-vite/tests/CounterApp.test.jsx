import {fireEvent, render, screen} from '@testing-library/react';
import {CounterApp} from '../src/CounterApp';

describe('Tests for <CounterApp /> component', function() {

    const initialValue = 10;

    test('Must match the snapshot', () => {
        const {container} = render( <CounterApp /> );
        expect(container).toMatchSnapshot();
    });

    test('Must show title inside h1', () => {
        render( <CounterApp value={100} /> );
        expect( screen.getByRole('heading', {level: 2}).innerHTML ).toContain("100");
    });

    test('Must increment on +1 button click', () => {
        render(<CounterApp value={ initialValue } />);
        fireEvent.click( screen.getByText('+1') );
        expect( screen.getByRole('heading', {level: 2}).innerHTML ).toBe(`${initialValue + 1}`);
    });

    test('Must decrement on -1 button click', () => {
        render(<CounterApp value={ initialValue } />);
        fireEvent.click( screen.getByText('-1') );
        expect( screen.getByRole('heading', {level: 2}).innerHTML ).toBe(`${initialValue - 1}`);
    });

    test('Must be on initial value when clicking reset', () => {
        render(<CounterApp value={ initialValue } />);
        fireEvent.click( screen.getByText('+1') );
        fireEvent.click( screen.getByText('+1') );
        fireEvent.click( screen.getByText('+1') );
        fireEvent.click( screen.getByRole('button', { name: 'btn-reset' }) );
        expect( screen.getByRole('heading', {level: 2}).innerHTML ).toBe(`${initialValue}`);
    });
});