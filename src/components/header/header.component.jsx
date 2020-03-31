import React from 'react';
import { Link } from 'react-router-dom';

// Selectors
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

// Redux
import { connect } from 'react-redux'

// Components
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import './header.styles.scss';

// Firebase
import { auth } from '../../firebase/firebase.utils';

const Header = ({ currentUser, hidden }) => (
  <div className='header'>
    <Link className='logo-container' to="/"> 
      <Logo className='logo'/>
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {
        currentUser 
        ? <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div> 
        : <Link className='option' to='/signin'>SIGN IN</Link>
      }
      <CartIcon />
    </div>
    {
      hidden ? null : <CartDropdown />
    }
  </div>
);

// createStructuredSelector will passs automatically the state parameter to the selectors
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
}) 

export default connect(mapStateToProps)(Header);