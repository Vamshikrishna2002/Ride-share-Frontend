import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/auth';
import Home from './pages/home';
import './App.css';


function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Auth/>}/>
            <Route path="/home" element={<Home/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
