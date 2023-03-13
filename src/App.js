import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Store from './pages/Store';
import Event from './pages/Event';
function App() {
  return (
    <>
      <Router>
        <Header />
          <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/event" element={<Event />} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
