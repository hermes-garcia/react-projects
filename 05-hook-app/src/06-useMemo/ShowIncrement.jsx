import {memo} from 'react';

export const ShowIncrement = memo(({increment}) => {
    console.log("i was re-render :(")
    return (
        <button
            className="btn btn-info"
            onClick={ () => {
                increment(5);
            } }
        >
            Increment
        </button>
    );
});