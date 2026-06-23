import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { JouerPage } from './pages/JouerPage';
import { QuestionnairePage } from './pages/QuestionnairePage';
import { ScoresPage } from './pages/ScoresPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, retry: 1 },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/jouer" element={<JouerPage />} />
            <Route path="/questionnaire" element={<QuestionnairePage />} />
            <Route path="/scores" element={<ScoresPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
