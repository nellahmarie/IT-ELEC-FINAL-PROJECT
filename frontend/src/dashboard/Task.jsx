const Task = ({ todo, index, setList, editMode }) => {
    const toggleCheckbox = () => {
        setList((currentTodoList) => {
            const updatedtodoTasks = currentTodoList.todoTasks.map((todo, i) => {
                return i === index ? { ...todo, isCompleted: !todo.isCompleted } : todo;
            });
            return { ...currentTodoList, todoTasks: updatedtodoTasks };
        });
    };

    const handleChanges = (newValue) => {
        setList((currentTodoList) => {
            const updatedtodoTasks = currentTodoList.todoTasks.map((todo, i) => {
                return i === index ? { ...todo, todo: newValue } : todo;
            });
            return { ...currentTodoList, todoTasks: updatedtodoTasks };
        });
    };

    const deleteTask = () => {
        setList((currentTodoList) => {
            const updatedTodoTasks = currentTodoList.todoTasks.filter((task, i) => i !== index);
            return { ...currentTodoList, todoTasks: updatedTodoTasks };
        });
    };

    return (
        <li className="flex w-full justify-between items-center" key={todo.id}>
            <div className="flex mr-2 w-full">
                <input className="mr-2" type="checkbox" checked={todo.isCompleted} disabled={!editMode} onChange={() => toggleCheckbox()} />
                {editMode ? (
                    <input
                        className="my-1 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900 min-w-fit w-full mr-2"
                        defaultValue={todo.todo}
                        onChange={(e) => handleChanges(e.target.value)}
                    />
                ) : (
                    <p className="font-sans font-light text-inherit antialiased overflow-hidden break-words">{todo.todo}</p>
                )}
            </div>
            {editMode && (
                <button
                    className="text-sm font-semibold hover:bg-red-100/50  transition duration-150 rounded text-red-500 py-2 px-3 my-2"
                    onClick={() => deleteTask()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </li>
    );
};

export default Task;
