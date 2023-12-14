import { useEffect, useState } from 'react';
import Task from './Task';
import axios from 'axios';
import { serverUrl } from '../constants';

const TodoList = ({ todoList, deleteTaskList }) => {
    const [list, setList] = useState(todoList);
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(todoList.title);
    const [titleError, setTitleError] = useState('');
    const [onSave, setOnSave] = useState(null);

    useEffect(() => {
        if (onSave !== null) {
            axios.put(`${serverUrl}/TaskList/${list.id}`, list).catch((error) => console.log(error));
            setOnSave(null);
        } // eslint-disable-next-line
    }, [onSave]);

    const handleChanges = (newValue) => {
        setTitle(newValue);
        setTitleError('');
    };

    const handleEdit = () => {
        if (editMode) {
            if (title.trim().length === 0) {
                setTitleError('Title is required');
                return;
            }

            setList((currentTodos) => {
                const filterList = currentTodos.todoTasks.filter((todo) => todo.todo.trim().length > 0);
                return { ...currentTodos, title: title, todoTasks: filterList };
            });

            setOnSave('');
        }
        setEditMode(!editMode);
    };

    const addItem = () => {
        setList((currentTodos) => {
            const updatedList = [...currentTodos.todoTasks, { todo: '', isCompleted: false }];
            return { ...currentTodos, todoTasks: updatedList };
        });
    };

    return (
        <div className="relative flex basis-1/4 flex-initial flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md p-6 m-4">
            <div className="flex items-start align-top">
                <div className="flex flex-col mr-4 w-full">
                    {editMode ? (
                        <input
                            className="my-1 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900 w-full"
                            value={title}
                            onChange={(e) => handleChanges(e.target.value)}
                        />
                    ) : (
                        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900">{title}</h5>
                    )}
                    {titleError.length > 0 && <p className="mt-1 text-red-500 ml-auto">{titleError}</p>}
                </div>

                <button
                    className="text-blue-500  border border-blue-500 focus:outline-none hover:bg-blue-50 focus:ring-gray-200 rounded-full text-sm py-2 px-5"
                    onClick={() => handleEdit(title)}
                >
                    {editMode ? 'Save' : 'Edit'}
                </button>
            </div>
            <ul className="py-1">
                {list.length === 0 && 'You have currently no tasks.'}
                {list.todoTasks.map((todo, index) => {
                    return <Task key={index} todo={todo} index={index} setList={setList} editMode={editMode} />;
                })}
            </ul>
            {editMode && (
                <button
                    className="text-sm font-semibold hover:bg-blue-100/60 transition duration-150 rounded text-blue-500 py-2 px-3 my-1 flex flex-row items-center justify-center w-32 self-center"
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
            )}
            <button
                className="text-sm font-semibold hover:bg-red-100/60 transition duration-150 rounded text-red-500 py-2 px-3 self-end"
                type="button"
                onClick={() => deleteTaskList(list.id)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    );
};

export default TodoList;
