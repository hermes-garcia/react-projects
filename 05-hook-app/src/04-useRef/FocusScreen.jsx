import {useRef} from 'react';

export const FocusScreen = () => {

    const inputRef = useRef();

    const handleClick = () => {
        inputRef.current.select();
    };

    return (
        <>
            <h1>Focus Screen</h1>
            <hr/>
            <input
                ref={inputRef}
                className="form-control"
                type="text"
                placeholder="Type your name"

            />

            <button
                onClick={handleClick}
                className="btn btn-success mt-2">
                Set focus
            </button>
        </>
    );
};