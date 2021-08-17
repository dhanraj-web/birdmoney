import React from "react";

const Navbar = () => {
  return (
    <nav className="nav-bar">
      <div className="main-logo">
        <img
          src="https://www.bird.money/static/bird-new/images/logo.svg"
          alt=""
        />
      </div>
      <ul className="nav-container">
        <li>Flight path</li>
        <li>Use Case</li>
        <li>Apps</li>
        <li>staking</li>
        <li>Developers</li>
        <li>FAQ</li>
        <li>Team</li>
      </ul>
    </nav>
  );
};

export default Navbar;
