import {TodoList, TodoAdd} from './';
import {useTodo} from '../hooks';
export const TodoApp = () => {

    const { todos, todosCount, pendingTodosCount, handleRemoveTodo, handleToggleTodo, handleNewTodo } = useTodo([]);

    return (
        <>
            <h1>TodoApp {todosCount}, <small>pending: {pendingTodosCount}</small></h1>
            <hr/>


            <div className="row">
                <div className="col-7">
                    <TodoList todos={todos} onDeleteTodo={handleRemoveTodo} onToggleTodo={handleToggleTodo} />
                </div>

                <div className="col-5">
                    <h4>Add To Do</h4>
                    <hr/>

                    <TodoAdd onNewTodo={handleNewTodo} />

                </div>
            </div>
        </>
    );
};