import axios from 'axios';
import { FormEnum, serverUrl } from '../constants';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

const LoginForm = ({ setForm }) => {
    const user = useContext(UserContext);
    const navigate = useNavigate();
    const loginSubmit = (event) => {
        event.preventDefault();
        var data = new FormData(event.target);
        let formObject = Object.fromEntries(data.entries());
        axios
            .post(`${serverUrl}/User/login`, formObject)
            .then((response) => {
                if (response.status === 200 && response.data !== null) {
                    user.setCurrentUser(response.data);
                    navigate('/dashboard');
                } else {
                    //TODO: show error message, cannot login
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <>
            <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">Welcome</h2>
            <p className="text-center text-sm text-gray-600 mt-2">
                New here?{' '}
                <a href="/#" className="text-blue-600 hover:text-blue-700 hover:underline" onClick={() => setForm(FormEnum.Signup)}>
                    Sign up
                </a>
            </p>
            <form className="my-8 text-sm" onSubmit={loginSubmit}>
                <div className="flex flex-col my-4">
                    <label htmlFor="username" className="text-gray-700">
                        Username
                    </label>
                    <input
                        defaultValue={'1'}
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                    />
                </div>
                <div className="flex flex-col my-4">
                    <label htmlFor="password" className="text-gray-700">
                        Password
                    </label>
                    <input
                        defaultValue={'1'}
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                    />
                </div>
                <div className="flex flex-col mt-8 mb-4">
                    <button
                        type="submit"
                        className="font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase"
                    >
                        Login
                    </button>
                </div>
            </form>
        </>
    );
};

export default LoginForm;
