import React, { createContext, useState } from 'react';
import Dashboard from './dashboard/Dashboard';
import FormHome from './home/FormHome';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './error-page/ErrorPage';

export const UserContext = createContext(null);
// export const UserContext = createContext({ id: 1 });

const App = () => {
    // const [currentUser, setCurrentUser] = useState({ id: 1 });
    const [currentUser, setCurrentUser] = useState(null);
    const router = createBrowserRouter([
        {
            path: '/',
            element: <FormHome />,
            errorElement: <ErrorPage />,
        },
        {
            path: '/dashboard',
            element: currentUser === null ? <Navigate to={'/'} /> : <Dashboard />,
        },
    ]);
    return (
        <>
            <UserContext.Provider value={{ currentUser, setCurrentUser }}>
                <RouterProvider router={router} />
            </UserContext.Provider>
        </>
    );
};

export default App;
