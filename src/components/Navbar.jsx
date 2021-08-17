import React from "react";
import "../styles/_navbar.scss";

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
        <li class="dropdown nav-menu-dropdown">
          <button class="dropbtn">
            Use Case
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a class="dropdown-item" href="/oracle">
              <div class="menu-image">
                <img
                  src="https://www.bird.money/static/bird-new/images/ana.svg"
                  alt=""
                />
              </div>
              <div class="links">
                <span>Oracle Analytics</span><br/>
                <span>On-Chain Oracle Protocols</span>
              </div>
            </a>
            <a class="dropdown-item" href="/loans">
              <div class="menu-image">
                <img
                  src="https://www.bird.money/static/bird-new/images/loan.svg"
                  alt=""
                />
              </div>
              <div class="links">
                <span>Loans</span><br/>
                <span>Non-Custodial Digital Asset Loans</span>
              </div>
            </a>
          </div>
        </li>

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
