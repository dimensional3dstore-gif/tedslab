import { Toaster } from "@/apps/quantumpaedia/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from './components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import Home from './pages/Home';
import Disciplines from './pages/Disciplines';
import DisciplineDetail from './pages/DisciplineDetail';
import Article from './pages/Article';
import Explore from './pages/Explore';
import SearchPage from './pages/SearchPage';
import Laboratory from './pages/Laboratory';
import Superposition from './pages/lab/Superposition';
import Entanglement from './pages/lab/Entanglement';
import DoubleSlit from './pages/lab/DoubleSlit';
import Tunnelling from './pages/lab/Tunnelling';
import Wavefunction from './pages/lab/Wavefunction';
import BlochSphere from './pages/lab/BlochSphere';
import CircuitBuilder from './pages/lab/CircuitBuilder';
import Research from './pages/Research';
import Mathematics from './pages/Mathematics';
import Scientists from './pages/Scientists';
import ScientistDetail from './pages/ScientistDetail';
import Experiments from './pages/Experiments';
import ExperimentDetail from './pages/ExperimentDetail';
import KnowledgeGraph from './pages/KnowledgeGraph';
import Assistant from './pages/Assistant';
import Timeline from './pages/Timeline';
import Applications from './pages/Applications';
import Collections from './pages/Collections';
import Settings from './pages/Settings';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/knowledge" element={<Disciplines />} />
        <Route path="/knowledge/:slug" element={<DisciplineDetail />} />
        <Route path="/articles/:slug" element={<Article />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/laboratory" element={<Laboratory />} />
        <Route path="/laboratory/superposition" element={<Superposition />} />
        <Route path="/laboratory/entanglement" element={<Entanglement />} />
        <Route path="/laboratory/double-slit" element={<DoubleSlit />} />
        <Route path="/laboratory/tunnelling" element={<Tunnelling />} />
        <Route path="/laboratory/wavefunction" element={<Wavefunction />} />
        <Route path="/laboratory/bloch-sphere" element={<BlochSphere />} />
        <Route path="/laboratory/circuit-builder" element={<CircuitBuilder />} />
        <Route path="/research" element={<Research />} />
        <Route path="/mathematics" element={<Mathematics />} />
        <Route path="/scientists" element={<Scientists />} />
        <Route path="/scientists/:slug" element={<ScientistDetail />} />
        <Route path="/experiments" element={<Experiments />} />
        <Route path="/experiments/:slug" element={<ExperimentDetail />} />
        <Route path="/graph" element={<KnowledgeGraph />} />
        <Route path="/assistant" element={<Assistant />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App