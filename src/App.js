import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Store from './pages/Store';
import Event from './pages/Event';
import CreateStore from './pages/CreateStore';
import CreateEvent from './pages/CreateEvent';
function App() {
  return (
    <>
      <Router>
        <Header />
          <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/event" element={<Event />} />
            <Route path="/create-store" element={<CreateStore />} />
            <Route path="/create-event" element={<CreateEvent />} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
