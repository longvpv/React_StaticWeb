import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Cart.css';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeItem, changeItemQuantity } from '../../actions/cart';
import { Link } from 'react-router-dom';

class Cart extends PureComponent {

    handleClickIncrement = (item) => {
        const itemId = item.id;
        const itemQuantity = item.quantity + 1;
        this.props.changeItemQuantity({itemId, itemQuantity});
        this.setState()

    }

    handleClickDecrement = (item) => {
        if (item.quantity === 0) return;
        const itemId = item.id;
        const itemQuantity = item.quantity - 1;
        this.props.changeItemQuantity({itemId, itemQuantity});
        this.setState()
    }

    handleChangeQuantity = (item, value) => {
        if (value < 0) return;
        const itemId = item.id;
        const itemQuantity = value;
        this.props.changeItemQuantity({itemId, itemQuantity});
        this.setState()

    }

    handleRemoveClick = (item) => {
        const itemId = item.id;
        this.props.removeItem({itemId});
    }
    render() {
        const {cartList, cartTotal} = this.props;
        console.log(cartList);
        return (
            <div className="container">
                <div className="row">
                <div className="cart-products-inner">
                <h2>Shopping Cart</h2>
                <hr/>
                    <ul className="cart-products__products">
                        {cartList.map(item => {
                            return (
                                <li key={item.id} className="cart-products__product">
                            <div className="cart-products__inner">
                                <div className="cart-products__img">
                                    <img src={item.pic} alt=""></img>
                                </div>
                                <div className="cart-products__content">
                                    <div className="cart-products__desc">
                                        <Link to={`/products/${item.id}`} className="cart-products__name"> {item.name} </Link>
                                        <p className="cart-products__actions"><span onClick={() => this.handleRemoveClick(item)} className="cart-products__del">Xóa</span></p>
                                    </div>
                                    <div className="cart-products__details">
                                        <div className="cart-products__pricess">
                                            <p className="cart-products__real-prices"><NumberFormat value={item.price} displayType='text' thousandSeparator={true} /> VND </p>
                                        </div>
                                        <div className="cart-products__qty">
                                            <div className="CartQty__StyledCartQty-sc-1looi6r-0 jijkkP">
                                                <span onClick={() => this.handleClickDecrement(item)} className="qty-decrease qty-disable">-</span>
                                                <input onChange={(value) => this.handleChangeQuantity(item, value)} type="number" name={item.name} value={item.quantity} className="qty-input"></input>
                                                <span onClick={() => this.handleClickIncrement(item)} className="qty-increase ">+</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </li>
                            )
                        })}

                        
                    </ul>
                </div>
                <div className="prices">
                <p className="prices__total"><span className="prices__text">Thành tiền</span>
                <span className="prices__value--final"><NumberFormat value={cartTotal} displayType='text' thousandSeparator={true} /> VND<i>(Đã bao gồm VAT nếu có)</i></span></p>
                </div>
                </div>
            </div>
                
            
        );
    }
}

Cart.propTypes = {
 cartList: PropTypes.array.isRequired,
 cartTotal: PropTypes.number.isRequired,

 removeItem: PropTypes.func.isRequired,
 changeItemQuantity: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    cartList: state.cartReducer.cartList,
    cartTotal: state.cartReducer.cartTotal,

})

const mapDispatchToProps = dispatch => {
        return bindActionCreators({
            removeItem,
            changeItemQuantity,
        }, dispatch);
      }

export default connect( mapStateToProps, mapDispatchToProps) (Cart);