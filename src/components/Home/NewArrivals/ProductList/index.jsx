import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import './NewArrivals.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal  from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { addToCart } from '../../../../actions/cart';
import NumberFormat from 'react-number-format';

class ProductList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
        }
    }
    
        
    handleAddToCartClick = (product) => {
        const item = {
            id: product.id,
            name: product.name, 
            price: product.salePrice , 
            pic:product.images[0], 
            quantity: 1,
        };
        console.log(item);
        this.props.addToCart(item);
        const modalShow = true;
        this.setState({modalShow})
    }

    handleClose = () => {
		const modalShow = false;
		this.setState({modalShow})
    }
    
    render() {
        const { products} = this.props;
        const { modalShow } = this.state;
        
        return (   
            <div className="container">
				<div className="row">
                
                <div>
				<Modal show={modalShow} onHide={this.handleClose}>
        		<Modal.Header closeButton>
          		<Modal.Title>Product Added</Modal.Title>
        		</Modal.Header>
        		<Modal.Body>Woohoo, your product is added</Modal.Body>
        		<Modal.Footer>
          			<Button variant="secondary" onClick={this.handleClose}>
            			Close
          			</Button>
					  <Link to='/Cart'>
          			<Button variant="primary" onClick={this.handleClose}>
					  Show Cart
          			</Button>
					  </Link>
        		</Modal.Footer>
      			</Modal>
				</div>
					<ul className="product-grid">
                    {products.map(product => {
                        return (
                            <li key={product.id} className="product-grid__item-width" >
                                
                                <div className="product-item">
                                <Link to={`/products/${product.id}`} >
                                <div className="product product_filter">
                           <div className="product_image">
                               <img src={product.images[0]} alt=""></img>
                           </div>
                           <div className="favorite"></div>
                           <div className="product_bubble product_bubble_left product_bubble_green d-flex flex-column align-items-center"><span>new</span></div>
                           <div className="product_info">
                               <h6 className="product_name">{product.name}</h6>
                               <div className="product_price">
                                <NumberFormat value={product.salePrice} displayType='text' thousandSeparator={true} /> VND
                                   {product.salePrice !== product.originalPrice ? (
											<span className="sale_price">{product.originalPrice}</span>) : ''	}</div>
                           </div>
                       </div>
                       </Link>
                                <div onClick={() => this.handleAddToCartClick(product)} className="red_button add_to_cart_button"><span>add to cart</span></div>
                                </div>
                                
                                
                       
                   </li>
                        )
                    })}
						
					</ul>
				</div>
			</div> 
            
        );
    }
}

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    addToCart : PropTypes.func.isRequired,

};
ProductList.defaultProps = {
    products : []
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		 addToCart,
	}, dispatch);
  }

export default connect (mapStateToProps, mapDispatchToProps) (ProductList);