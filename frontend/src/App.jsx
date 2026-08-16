import { Routes, Route } from 'react-router-dom';
import WordList from './pages/WordList';
import WordDetail from './pages/WordDetail';
import ProposeWord from './pages/ProposeWord';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WordList />} />
      <Route path="/words/:id" element={<WordDetail />} />
      <Route path="/propose" element={<ProposeWord />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;