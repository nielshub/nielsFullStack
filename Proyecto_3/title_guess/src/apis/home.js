import React from "react";
import "./home.scss";
import { Link } from "react-router-dom";

export default function home(props) {
  return (
    <div>
      <div className="stage">
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
      </div>
      <div>
        <div>
          <span>.</span>
        </div>
        <div id="country">
          <Link to="/us">
            <button className="button">United States</button>
          </Link>
          <Link to="/jp">
          <button className="button">Japan</button>
          </Link>
          <Link to="/fr">
          <button className="button">France</button>
          </Link>
          <Link to="/it">
          <button className="button">Italia</button>
          </Link>
          <Link to="/br">
            <button className="button">Brasil</button>
          </Link>
          <Link to="/nl">
            <button className="button">Netherland</button>
          </Link>
          <Link to="/topics">
            <button className="button">App Info</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
