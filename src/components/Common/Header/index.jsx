import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

class Header extends PureComponent {
    
    render() {
        const {CartList} = this.props;
        const total = CartList.reduce((a,b) => a + b.quantity, 0);

        return (
            <>
               <header className="header trans_300">

 {/* Top Navigation  */}

<div className="top_nav">
    <div className="container">
        <div className="row">
            <div className="col-md-6">
                <div className="top_nav_left">free shipping on all u.s orders over $50</div>
            </div>
            <div className="col-md-6 text-right">
                <div className="top_nav_right">
                    <ul className="top_nav_menu">

                        {/* <!-- Currency / Language / My Account --> */}
                        <li className="language">
                                <span>English</span>
                                <i className="fa fa-angle-down"></i>
                            
                            <ul className="language_selection">
                                <li>French</li>
                                <li>Italian</li>
                                <li>German</li>
                                <li>Spanish</li>
                            </ul>
                        </li>
                        <li className="account">
                            
                                My Account
                                <i className="fa fa-angle-down"></i>
                            
                            <ul className="account_selection">
                                <li><i className="fa fa-sign-in" aria-hidden="true"></i>Sign In</li>
                                <li><i className="fa fa-user-plus" aria-hidden="true"></i>Register</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

{/* <!-- Main Navigation --> */}

<div className="main_nav_container">
    <div className="container">
        <div className="row">
            <div className="col-lg-12 text-right">
                <div className="logo_container">
                    Nordic<span>Shop</span>
                </div>
                <nav className="navbar">
                    <ul className="navbar_menu">
                    <li>
                        <NavLink
                        to='/'
                        className="nav__link"
                        activeClassName="nav__link--active"
                        >
                        Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                        to='/ShopPage'
                        className="nav__link"
                        activeClassName="nav__link--active"
                        >
                        Shop
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                        to='/'
                        className="nav__link"
                        activeClassName="nav__link--active"
                        >
                        Promotion
                        </NavLink>
                    </li>
                    <li>
                            <a href="https://nordiccoder.com/blog">Blog</a>
                        
                    </li>
                    <li>
                        <NavLink
                        to='/Contact'
                        className="nav__link"
                        activeClassName="nav__link--active"
                        >
                        Contact
                        </NavLink>
                    </li>
                     </ul>
                    <ul className="navbar_user">
                          <li className="checkout">
                          <Link to='/Cart' >
                          <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                <span id="checkout_items" className="checkout_items">{total}</span>
                          </Link>
                            
                        </li>
                    </ul>
                    <div className="hamburger_container">
                        <i className="fa fa-bars" aria-hidden="true"></i>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</div>

</header>

<div className="fs_menu_overlay"></div>
<div className="hamburger_menu">
<div className="hamburger_close"><i className="fa fa-times" aria-hidden="true"></i></div>
<div className="hamburger_menu_content text-right">
    <ul className="menu_top_nav">
        <li className="menu_item has-children">
            
                usd
                <i className="fa fa-angle-down"></i>
            
            <ul className="menu_selection">
                <li>cad</li>
                <li>aud</li>
                <li>eur</li>
                <li>gbp</li>
            </ul>
        </li>
        <li className="menu_item has-children">
            
                English
                <i className="fa fa-angle-down"></i>
            
            <ul className="menu_selection">
                <li>French</li>
                <li>Italian</li>
                <li>German</li>
                <li>Spanish</li>
            </ul>
        </li>
        <li className="menu_item has-children">
            
                My Account
                <i className="fa fa-angle-down"></i>
            
            <ul className="menu_selection">
                <li><i className="fa fa-sign-in" aria-hidden="true"></i>Sign In</li>
                <li><i className="fa fa-user-plus" aria-hidden="true"></i>Register</li>
            </ul>
        </li>
        <li className="menu_item">home</li>
        <li className="menu_item">shop</li>
        <li className="menu_item">promotion</li>
        <li className="menu_item">pages</li>
        <li className="menu_item">blog</li>
        <li className="menu_item">contact</li>
    </ul>
</div>
</div> 
            </>
        );
    }
}

Header.propTypes = {
    CartList: PropTypes.array.isRequired,
  }
  
  const mapStateToProps = state => ({
      CartList: state.cartReducer.cartList,
  })
  
//   const mapDispatchToProps = dispatch => {
//     return bindActionCreators({
//         getCartList,
//     }, dispatch);
//   }
  export default connect(mapStateToProps)(Header);