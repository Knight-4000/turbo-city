import React from 'react'
import './footer.css'
import { useNavigate } from 'react-router-dom'

export default function Footer() {
    const navigate = useNavigate()

    return (
        <>
        <footer className="py-3 my-4">
            <h1 className='text-center footer-header py-3'>Turbo City</h1>
            <ul className="nav justify-content-center pb-3 mb-3">
                <li className="footer-link py-2 px-4" onClick={() => navigate('/')}>
                    Home
                </li>
                <li className="footer-link py-2 px-4" onClick={() => navigate('/stores')}>
                    Stores
                </li>
                <li className="footer-link py-2 px-4" onClick={() => navigate('/events')}>
                    Events
                </li>
            </ul>
            <p className="copyright text-center">© 2023 Bill G.</p>
        </footer>
    </>
    
  )
}
