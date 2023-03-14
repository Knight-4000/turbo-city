import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Store from './pages/Store';
import Stores from './pages/Stores';
import Event from './pages/Event';
import Events from './pages/Events';
import CreateStore from './pages/CreateStore';
import CreateEvent from './pages/CreateEvent';
import Footer from './components/Footer';
function App() {
  return (
    <>
      <Router>
        <Header />
          <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/store/:id" element={<Store/>} />
            <Route
                path="/category/:categoryName/:storeId"
                element={<Store />}
            />
            <Route path="/events" element={<Events />} />
            <Route path="/event/:id" element={<Event/>} />
            <Route
                path="/charity/:charityName/:eventId"
                element={<Event />}
            />
            <Route path="/create-store" element={<CreateStore />} />
            <Route path="/create-event" element={<CreateEvent />} />
          </Routes>
          <Footer />
      </Router>
    </>
  );
}

export default App;
