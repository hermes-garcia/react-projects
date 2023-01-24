import {render, screen} from '@testing-library/react';
import {GifItem} from '../../src/components';

describe('Tests for <GifItem /> component', function() {
    const title = "New gif";
    const url = "https://example.com/";

    test('Must match snapshot', () => {
        const {container} = render( <GifItem title={title} url={url} /> );
        expect(container).toMatchSnapshot();
    });

    test('Must show image with url & alt sent', () => {
        render( <GifItem title={title} url={url} /> );
        const {src, alt} = screen.getByRole('img');
        expect(src).toBe(url);
        expect(alt).toBe(title);
    });

    test('Must have title render as a text', () => {
        render( <GifItem title={title} url={url} /> );
        expect(screen.getByText(title)).toBeTruthy();
    });
});