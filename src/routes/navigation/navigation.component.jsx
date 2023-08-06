import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

import { cartContext } from "../../contexts/cart.context";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../store/user/user.selector";

import { ReactComponent as CrwnSVG } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { isCartOpen } = useContext(cartContext);

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
            <li className="nav-link">
              <CartIcon />
            </li>
          </ul>
          {isCartOpen && <CartDropdown />}
        </nav>
      </header>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
