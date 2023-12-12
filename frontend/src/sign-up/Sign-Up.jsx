import { useState } from 'react';
import { FormEnum, serverUrl } from '../constants';
import axios from 'axios';

const SignUpForm = ({ setForm }) => {
    const [usernameError, setUsernameError] = useState('');
    const [passError, setPassError] = useState('');
    const [confirmPassError, setConfirmPassError] = useState('');

    const submitForm = (event) => {
        event.preventDefault();
        var formObject = Object.fromEntries(new FormData(event.target).entries());
        if (validateForm(formObject.username, formObject.password, formObject.confirmPassword)) {
            axios.post(`${serverUrl}/User`, formObject).then((response) => {
                if (response.status === 201) setForm(FormEnum.Login);
            });
        }
    };

    const validateForm = (username, password, confirmPassword) => {
        var isValid = true;
        if (isEmpty(username)) {
            setUsernameError('Username Required');
            isValid = false;
        }
        if (isEmpty(password)) {
            setPassError('Password Required');
            isValid = false;
        }
        if (isEmpty(confirmPassword)) {
            setConfirmPassError('Please Confirm your password');
            isValid = false;
        }
        if (password !== confirmPassword) {
            setConfirmPassError("Passwords don't match");
            isValid = false;
        }

        return isValid;
    };

    return (
        <div>
            <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">Sign Up</h2>
            <p className="text-center text-sm text-gray-600 mt-2">
                Already have an account?{' '}
                <a href="/#" className="text-blue-600 hover:text-blue-700 hover:underline" onClick={() => setForm(FormEnum.Login)}>
                    Login here
                </a>
            </p>
            <form className="my-8 text-sm" onSubmit={submitForm}>
                <div className="flex flex-col my-4">
                    <label htmlFor="username" className="text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                        onChange={() => setUsernameError('')}
                    />
                    {usernameError.length > 0 && <p className="mt-1 text-red-500 ml-auto">{usernameError}</p>}
                </div>
                <div className="flex flex-col my-4">
                    <label htmlFor="password" className="text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                        onChange={() => setPassError('')}
                    />
                    {passError.length > 0 && <p className="mt-1 text-red-500 ml-auto">{passError}</p>}
                </div>
                <div className="flex flex-col my-4">
                    <label htmlFor="confirmPassword" className="text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Password"
                        className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                        onChange={() => setConfirmPassError('')}
                    />
                    {confirmPassError.length > 0 && <p className="mt-1 text-red-500 ml-auto">{confirmPassError}</p>}
                </div>
                <div className="flex flex-col mt-8 mb-4">
                    <button
                        type="submit"
                        className="font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase"
                    >
                        SIGN UP
                    </button>
                </div>
            </form>
        </div>
    );
};

const isEmpty = (value) => {
    if (value == null || value === '') return true;
    else return false;
};

export default SignUpForm;
