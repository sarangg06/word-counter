import { Routes, Route } from 'react-router-dom';
import WordList from './pages/WordList';
import WordDetail from './pages/WordDetail';
import ProposeWord from './pages/ProposeWord';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WordList />} />
      <Route path="/words/:id" element={<WordDetail />} />
      <Route path="/propose" element={<ProposeWord />} />
    </Routes>
  );
}

export default App;