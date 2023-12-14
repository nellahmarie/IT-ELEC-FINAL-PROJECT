import { useState } from 'react';

const FormAddTodoList = ({ addTodoList }) => {
    const [titleError, setTitleError] = useState('');
    const [todos, setTodos] = useState(['']);
    const handleSubmit = (event) => {
        event.preventDefault();
        var formObject = Object.fromEntries(new FormData(event.target).entries());
        if (formObject.title.trim().length === 0) {
            setTitleError('Title is required');
            return;
        }

        const newTaskList = {
            title: formObject.title.trim(),
            todoTasks: todos
                .filter((task) => task.trim().length > 0)
                .map((task) => ({
                    todo: task,
                })),
        };

        addTodoList(newTaskList);
        event.target.reset();
        setTodos(['']);
    };

    const addItem = () => {
        setTodos((currentTodos) => {
            return [...currentTodos, ''];
        });
    };

    return (
        <div className="flex flex-col justify-center relative shrink-1 basis-1/4 rounded-xl bg-white bg-clip-border text-gray-700 shadow-md p-6 m-4 min-w-fit">
            <form className="text-sm flex flex-col" onSubmit={handleSubmit}>
                <div className="flex justify-between items-center">
                    <label>Add New List</label>
                    <button
                        className="text-sm font-semibold bg-blue-500 hover:bg-blue-600 hover:shadow-xl transition duration-150 rounded text-white py-2 px-3 my-2"
                        type="submit"
                    >
                        Add List
                    </button>
                </div>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    id="titleInput"
                    className="my-1 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900 w-full"
                    placeholder="Title"
                    onChange={() => setTitleError('')}
                />
                {titleError.length > 0 && <p className="mt-1 text-red-500 ml-auto">{titleError}</p>}
                <div className="relative flex py-4 mx-2 items-center">
                    <div className="flex-grow border-t border-gray-400"></div>
                </div>
                {todos.map((todo, index) => (
                    <TodoTask key={index} index={index} todos={todos} setTodos={setTodos} />
                ))}

                <button
                    className="text-sm font-semibold hover:bg-blue-100/60 transition duration-150 rounded text-blue-500 py-2 px-3 my-2 flex flex-row items-center justify-center w-32 self-center"
                    type="button"
                    onClick={() => addItem()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
                        <path
                            fillRule="evenodd"
                            d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Add item
                </button>
            </form>
        </div>
    );
};

const TodoTask = ({ index, todos, setTodos }) => {
    const handleChange = (newValue) => {
        setTodos(
            todos.map((todo, i) => {
                return i === index ? newValue : todo;
            })
        );
    };

    return (
        <textarea
            className="my-1 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900 w-full break-words resize-none"
            placeholder="Todo"
            value={todos[index]}
            onChange={(e) => handleChange(e.target.value)}
            type="text"
            name={`item${index}`}
        />
    );
};

export default FormAddTodoList;
