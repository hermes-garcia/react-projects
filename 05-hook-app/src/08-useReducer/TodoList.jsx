import {TodoItem} from './';

export const TodoList = ({todos = [], onDeleteTodo, onToggleTodo}) => {



    return (
        <ul className="list-group">
            {
                todos.map( todo => (
                    <TodoItem key={todo.id} todo={ todo }
                              onDeleteTodo={ deletedTodo => onDeleteTodo(deletedTodo) }
                              onToggleTodo={ toggledTodo => onToggleTodo(toggledTodo) } />
                ))
            }
        </ul>
    );
};