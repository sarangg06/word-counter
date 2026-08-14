import { Routes, Route } from 'react-router-dom';
import WordList from './pages/WordList';
import WordDetail from './pages/WordDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WordList />} />
      <Route path="/words/:id" element={<WordDetail />} />
    </Routes>
  );
}

export default App;