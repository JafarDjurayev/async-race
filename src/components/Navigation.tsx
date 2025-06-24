import React from 'react';
import { Link} from 'react-router-dom';
import '../styles/Navigation.css';



 function Navigation() {
    return (
        <nav>
            <div className="nav-container">
                <div className="nav-title">
                    <a href="">Async Race</a>
                </div>
                <ul className="nav-list">
                    <li><Link to="/">Garage</Link></li>
                    <li><Link to="/winners">Winners</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;