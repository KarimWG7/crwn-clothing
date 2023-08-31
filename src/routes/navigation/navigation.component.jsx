import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

// import { cartContext } from "../../contexts/cart.context";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { selectIsCartOpen} from "../../store/cart/cart.selector"
import { selectCurrentUser } from "../../store/user/user.selector";

import { ReactComponent as CrwnSVG } from "../../assets/crown.svg";

import "./navigation.styles.scss";
import { useDispatch } from "react-redux";
import { signOutStart } from "../../store/user/user.action";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutHandler = () => {
    dispatch(signOutStart());
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
