import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { ListAgenda } from './pages/ListAgenda';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 10 * 1000,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ListAgenda />
    </QueryClientProvider>
  );
}

export default App;
