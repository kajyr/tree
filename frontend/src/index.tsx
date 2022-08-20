import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from 'pages/dashboard';
import Details from 'pages/details';

import { NotificationsProvider } from '@mantine/notifications';

import FourOhFour from './pages/four-oh-four';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const container = document.getElementById('rroot');
if (container) {
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(
    <>
      <NotificationsProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<FourOhFour />} />
              <Route index element={<Dashboard />} />
              <Route path="/p/:id" element={<Details />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </NotificationsProvider>
    </>
  );
}
