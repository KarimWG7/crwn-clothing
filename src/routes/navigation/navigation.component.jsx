import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnSVG } from "../../assets/crown.svg";

import "./navigation.styles.scss";

const Navigation = () => {
  return (
    <Fragment>
      <header className="navigation">
        <Link to="/" className="logo-container">
          <CrwnSVG className="logo" />
        </Link>
        <nav className="nav-links-container">
          <ul>
            <li className="nav-link">
              <Link to="/shop">Shop</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
