import { useState } from 'react';
import PropTypes from "prop-types";

export const CounterApp = ({ value }) => {

    const [ counter, setCounter] = useState(value);
    const handleAdd = () => setCounter(counter + 1);
    const handleSubtract = () => setCounter((counter >0) ? counter - 1 : 0);
    const handleReset = () => setCounter(value);

    return (
        <>
            <h1>CounterApp</h1>
            <h2>{ counter }</h2>

            <button onClick={ handleAdd }>+1</button>
            <button onClick={ handleSubtract }>-1</button>
            <button aria-label="btn-reset" onClick={ handleReset }>Reset</button>
        </>
    );
}

CounterApp.propTypes = {
    value: PropTypes.number.isRequired
}

CounterApp.defaultProps = {
    value: 0
}