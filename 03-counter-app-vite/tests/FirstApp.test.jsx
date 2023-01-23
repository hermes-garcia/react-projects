import {render} from '@testing-library/react';
import {FirstApp} from '../src/FirstApp.jsx';

describe('Test for <FirstApp />', function () {
    // test('Must match the snapshot', () => {
    //     const title = 'Hi, my name is Hermes';
    //     const {container} = render( <FirstApp title={title} /> );
    //     expect(container).toMatchSnapshot(); // if the comp change a lot, must not worth match the snapshot
    // });

    test('Must show title in h1', () => {
        const title = 'Hi, my name is Hermes';
        const {container, getByText, getByTestId} = render( <FirstApp title={title} /> );
        expect(getByText(title)).toBeTruthy();

        // const h1 = container.querySelector('h1');
        // expect(h1.innerHTML).toContain(title);

        expect(getByTestId('test-title').innerHTML).toContain(title);
    });


    test('Must show subtitle sent in props', () => {
        const title = 'Hi, my name is Hermes';
        const subtitle = 'Im a developer';
        const {getAllByText} = render(
            <FirstApp
                title={title}
                subtitle={subtitle}
            />
        );
        expect(getAllByText(subtitle).length).toBe(2);
    });
});