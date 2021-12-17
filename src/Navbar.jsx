import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import NoteContext from './state/NoteContext';

const Navbar = () => {
    const context = useContext(NoteContext);
    function dlt()
    {
        localStorage.removeItem('token');
        window.location.reload();
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">Notes</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                        </ul>
                        {localStorage.getItem('token') ? <button onClick={dlt} className="btn mx-1 btn-danger">Logout</button> : <><NavLink to="/Signin" className="btn mx-1 btn-info">Sign In</NavLink>
                        <NavLink to="/login" className="btn mx-1 btn-warning">Login</NavLink></>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;