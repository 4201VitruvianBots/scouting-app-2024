import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fontsource/poppins';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import RootMenu from './RootMenu';
import AdminApp from './apps/admin/AdminApp';
import MatchApp from './apps/match/MatchApp';
import PitApp from './apps/pit/PitApp';
import ReconApp from './apps/recon/ReconApp';
import SuperApp from './apps/super/SuperApp';
import PublicApp from './apps/public/PublicApp';
import PicklistApp from './apps/picklist/PicklistApp';
import 'react-material-symbols/rounded';



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
                path: 'public',
                element: <PublicApp />,
            },
            {
                path: 'recon',
                element: <ReconApp />,
            },
            {
                path: 'super',
                element: <SuperApp />,
            },
            {
                path: 'picklist',
                element: <PicklistApp />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
