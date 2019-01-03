import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (

    <nav className="navbar is-success" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item" >
          <h4 className="title is-4"><i>LearnBrd</i></h4>
        </Link>
        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item" >Home</Link>
          <Link to="/favorites/" className="navbar-item" >My Favorites</Link>
          <Link to="/suggest/" className="navbar-item" >Add suggestion</Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary" href="/admin/">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light" href="/admin/">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>



    </nav>

  );
}

export default Header;