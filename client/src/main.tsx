import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-select-search/style.css';
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
import 'react-material-symbols/rounded';
import Games from './apps/games/Games';
import ScoringCalculator from './apps/score_calculator/ScoreCalculator';

import { registerSW } from 'virtual:pwa-register';

const PicklistApp = lazy(() => import('./apps/picklist/PicklistApp'));

// Automatically reloads the page a second time to update the SW
registerSW();

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
                element: (
                    <Suspense fallback={<p>Loading</p>}>
                        <PicklistApp />
                    </Suspense>
                ),
            },
            {
                path: 'games',
                element: <Games />,
            },
            {
                path: 'score_calculator',
                element: <ScoringCalculator />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
