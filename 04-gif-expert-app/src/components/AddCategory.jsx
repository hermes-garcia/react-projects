import {useState} from 'react';
import PropTypes from 'prop-types';

export const AddCategory = ({onNewCategory}) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = ({target}) => {
        setInputValue(target.value);
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const newInputValue = inputValue.trim();
        if(newInputValue.length <= 1) return;
        onNewCategory(newInputValue);
        setInputValue('');
    };

    return (
        <>
            <form aria-label="form" onSubmit={ handleSubmit}>
                <input
                    type="text"
                    placeholder="Search Gifs..."
                    value={ inputValue }
                    onChange={ handleInputChange }
                />
            </form>
        </>
    );
};

AddCategory.propTypes = {
    onNewCategory: PropTypes.func.isRequired
}