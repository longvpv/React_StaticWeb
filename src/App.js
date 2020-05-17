import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { addToCart, changeItemQuantity, removeItem } from './actions/cart';
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Benefit from './components/Common/Benefit';
import Footer from './components/Common/Footer';
import Header from './components/Common/Header';
import CartPage from './containers/CartPage';
import HomePage from './containers/HomePage';
import ProductDetailPage from './containers/ProductDetailPage';
import ShopPage from './containers/ShopPage';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/ShopPage" component={ShopPage} />
        <Route path="/products/:productId" component={ProductDetailPage} />
        <Route path="/Cart" component={CartPage} />
      </Switch>
        <Benefit />
        <Footer />
      </BrowserRouter>
     
  
    

      
    </div>
  );
}

App.propTypes = {
  // itemQuantity: PropTypes.number.isRequired,

  addToCart: PropTypes.func.isRequired,
  removeItem : PropTypes.func.isRequired,
  changeItemQuantity: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
      addToCart,
      removeItem,
      changeItemQuantity,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
