import React from "react";
import { AppsList, FooterList } from "../common";

const Footer = () => {
  return (
    <div className="footer-container">
      <div>
        <p>Logo</p>
        <p>
          Bird.Money is powered by a driven team <br /> and an amazing
          community.
        </p>
        <p>icons</p>
        <p>Copyright 2021 Bird.Money</p>
      </div>
      <div>
        <p>Bird.money</p>
        {FooterList.map((data) => {
          return <li>{data.name}</li>;
        })}
      </div>
      <div>
        <p>Apps</p>
        {AppsList.map((data) => {
          return <li>{data.name}</li>;
        })}
      </div>
      <div>div4</div>
    </div>
  );
};

export default Footer;
