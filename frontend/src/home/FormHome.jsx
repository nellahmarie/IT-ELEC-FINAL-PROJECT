import { useState } from 'react';
import { FormEnum } from '../constants';
import LoginForm from '../login/Login';
import SignUpForm from '../sign-up/Sign-Up';

const FormHome = () => {
    const [form, setForm] = useState(FormEnum.Login);

    return (
        <div className="bg-gray-200 w-full min-h-screen flex items-center justify-center">
            <div className="w-full py-8">
                <div className="bg-white w-5/6 md:w-3/4 lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-8 mx-auto px-16 py-8 rounded-lg shadow-2xl">
                    {form === FormEnum.Login ? <LoginForm setForm={setForm} /> : <SignUpForm setForm={setForm} />}
                </div>
            </div>
        </div>
    );
};

export default FormHome;
