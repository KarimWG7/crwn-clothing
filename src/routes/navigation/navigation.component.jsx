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
        <nav>
          <ul className="nav-links-container">
            <li className="nav-link">
              <Link to="/shop">Shop</Link>
            </li>
            <li className="nav-link">
              <Link to="/auth">Sign In</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
