import {render, screen} from '@testing-library/react';
import {FirstApp} from '../src/FirstApp.jsx';

describe('Test for <FirstApp />', function () {
    const title = 'Hi, my name is Hermes';
    const subtitle = 'Im a developer';

    test('Must match the snapshot', () => {
        const {container} = render( <FirstApp title={title} /> );
        expect(container).toMatchSnapshot(); // if the comp change a lot, must not worth match the snapshot
    });

    test('Must show "Hi, my name is Hermes" message', () => {
        render( <FirstApp title={title} /> );
        expect(screen.getByText(title)).toBeTruthy();
    });

    test('Must show title inside h1', () => {
        render( <FirstApp title={title} /> );
        expect( screen.getByRole('heading', {level: 1}).innerHTML ).toContain(title);
    });

    test('Must show subtitle sent in props', () => {

        render( <FirstApp title={title} subtitle={subtitle}/> );
        expect(screen.getAllByText(subtitle).length).toBe(2);
    });
});