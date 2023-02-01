import {todoReducer} from '../08-useReducer';
import {useEffect, useReducer} from 'react';

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodo = (initialState) => {
    const [todos, dispatch] = useReducer(todoReducer, initialState , init);

    useEffect(() => {
        localStorage.setItem('todos',JSON.stringify(todos));
    }, [todos]);

    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        };
        dispatch( action );
    };

    const handleRemoveTodo = (todo) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: todo
        });
    };

    const handleToggleTodo = (todo) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: todo
        });
    };

    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter( todo => todo.done === false ).length,
        handleRemoveTodo,
        handleToggleTodo,
        handleNewTodo
    }
};