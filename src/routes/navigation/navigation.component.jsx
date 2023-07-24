import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnSVG } from "../../assets/crown.svg";

import { userContext } from "../../components/contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser } = useContext(userContext);

  const signOutHandler = async () => {
    await signOutUser();
  };

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
            {currentUser ? (
              <span className="nav-link" onClick={signOutHandler}>
                Sign Out
              </span>
            ) : (
              <li className="nav-link">
                <Link to="/auth">Sign In</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
