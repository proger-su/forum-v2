import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FirebaseProvider } from './contexts/FirebaseContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Forums from './pages/Forums';
import Tasks from './pages/Tasks';
import Emails from './pages/Emails';
import Websites from './pages/Websites';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FirebaseProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="forums" element={<Forums />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="emails" element={<Emails />} />
              <Route path="websites" element={<Websites />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FirebaseProvider>
    </QueryClientProvider>
  );
}

export default App;