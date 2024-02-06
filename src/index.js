import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorPage from "./components/error-page";
import Profile from "./components/profile";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Tasks from './components/tasks';
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/tasks",
                element: <Tasks/>,
            },
            {
                path: "/profile",
                element: <Profile/>,
            }
        ],
    },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);
