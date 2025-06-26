import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SongNotes from './pages/SongNotes';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<SongNotes />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
