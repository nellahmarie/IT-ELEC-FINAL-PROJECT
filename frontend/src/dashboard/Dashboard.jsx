import { useContext, useEffect, useState } from 'react';
import FormAddTodoList from './FormAddTodoList';
import TodoList from './TodoList';
import axios from 'axios';
import { serverUrl } from '../constants';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

const Dashboard = () => {
    const [todoList, setTodoList] = useState([]);
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        axios
            .get(`${serverUrl}/TaskList/User/${currentUser.id}`)
            .then((response) => {
                setTodoList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [currentUser.id]);

    const addTodoList = (newTaskList) => {
        axios.post(`${serverUrl}/TaskList/${currentUser.id}`, newTaskList).then((response) => {
            setTodoList((currentTodoList) => {
                return [...currentTodoList, response.data];
            });
        });
    };

    const deleteTaskList = (id) => {
        axios
            .delete(`${serverUrl}/TaskList/${id}`)
            .then((response) => {
                setTodoList((currentTodoList) => {
                    return currentTodoList.filter((todoList) => todoList.id !== id);
                });
            })
            .catch((response) => console.log(response));
    };

    return (
        <>
            <nav className="flex items-center justify-center p-3  border-b-2 border-b-gray-300">
                <div className="w-full text-center">
                    <h2 className="text-lg font-semibold tracking-widest text-gray-900 uppercase">Hello there {currentUser.username}</h2>
                </div>
                <div className="top-navbar">
                    <Link to={'/'}>
                        <button className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto bg-blue-500 hover:bg-blue-600 hover:shadow-xl transition duration-150 rounded">
                            <span className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center text-sm font-semibold">
                                Logout
                            </span>
                        </button>
                    </Link>
                </div>
            </nav>
            <div className="flex items-start flex-wrap">
                <FormAddTodoList addTodoList={addTodoList} />
                {todoList.map((list, index) => {
                    return <TodoList key={index} todoList={list} deleteTaskList={deleteTaskList} />;
                })}
            </div>
        </>
    );
};

export default Dashboard;
