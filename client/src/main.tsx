import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import RootMenu from './RootMenu';
import AdminApp from './apps/admin/AdminApp';
import MatchApp from './apps/match/MatchApp';
import PitApp from './apps/pit/PitApp';
import ReconApp from './apps/recon/ReconApp';
import SuperApp from './apps/super/SuperSApp';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                index: true,
                element: <RootMenu />,
            },
            {
                path: 'admin',
                element: <AdminApp />,
            },
            {
                path: 'match',
                element: <MatchApp />,
            },
            {
                path: 'pit',
                element: <PitApp />,
            },
            {
                path: 'recon',
                element: <ReconApp />,
            },
            {
                path: 'super',
                element: <SuperApp />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
