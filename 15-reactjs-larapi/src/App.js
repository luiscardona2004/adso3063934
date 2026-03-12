import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Add from './pages/Add';
import Edit from './pages/Edit';
import Show from './pages/Show';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/"           element ={<Login />} />
          <Route path="/dashboard"  element={<Dashboard />} />
          <Route path="/add"        element={<Add />} />
          <Route path="/edit/:id"   element={<Edit />} />
          <Route path="/show/:id"   element={<Show />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;