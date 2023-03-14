import React, {useState} from "react";
import './header.css';
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  const navigate = useNavigate()
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    const updateMenu = () => {
        if(!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setSidebar(sidebar)
        }
        else {
            setBurgerClass("burger-bar unclicked")
            setSidebar(!sidebar)
        }
        setSidebar(!sidebar)
        setIsMenuClicked(!isMenuClicked)
    }

    return(
        <Navbar expand="lg" className="navbar">
          <Container>
            <nav>
              <div className="burger-menu d-lg-none" onClick={updateMenu}>
                <div id="close-button" className={burger_class} ></div>
                <div id="close-button" className={burger_class} ></div>
                <div id="close-button" className={burger_class} ></div>
              </div> 
              <Navbar.Brand className="mx-auto logo d-lg-none" href="#home">Turbo City Mall</Navbar.Brand>
              <Navbar.Brand className="logo d-none d-lg-block" href="#home">Turbo City Mall</Navbar.Brand>
            </nav>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link id="nav-hover" className="nav-link" onClick={() => navigate('/')}>Home</Nav.Link>
                <Nav.Link id="nav-hover" className="nav-link" onClick={() => navigate('/stores')}>Stores</Nav.Link>
                <Nav.Link id="nav-hover" className="nav-link" onClick={() => navigate('/events')}>Events</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items list-unstyled' onClick={showSidebar}>
              <li onClick={updateMenu}><a className="mobile-link" href="/">Home</a></li>
              <li onClick={updateMenu}><a className="mobile-link" href="/stores">Stores</a></li>
              <li onClick={updateMenu}><a className="mobile-link" href="/events">Events</a></li>
            </ul>
          </nav>
        </Container>
      </Navbar>
    ) 
  }

export default Header