import {useForm} from '../hooks';

export const TodoAdd = ({onNewTodo}) => {
    const {description, handleInputChange, handleResetForm} = useForm({
        description: ''
    });

    const handleSubmit = (ev) => {
        ev.preventDefault();
        if(description.length <= 1) return;
        const newTodo = {
            id: new Date().getTime(),
            description,
            done: false
        };
        onNewTodo(newTodo);
        handleResetForm();
    };

    return (
        <form onSubmit={ handleSubmit}>
            {/*capt submit and emitir un nuevo valor*/}
            <input
                type="text"
                placeholder="Type something..."
                className="form-control"
                name="description"
                value={ description }
                onChange={ handleInputChange }
            />
            <button
                type="submit"
                className="btn btn-outline-primary mt-1"
            >
                Add
            </button>
        </form>
    );
};