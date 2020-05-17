import React, { PureComponent } from 'react';
import './Breadcrumbs.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCart } from '../../../actions/cart';
import NumberFormat from 'react-number-format';
import Modal  from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

class Breadcrumbs extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			activeImagePosition: 0,
			modalShow: false,
		}
	};

	handleClick = (number) => {
		const activeImagePosition = number
		this.setState({activeImagePosition});
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
		const {product, productImages, categoryName} = this.props;
		const { activeImagePosition, modalShow} = this.state;

        return ( 
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
                <div className="container single_product_container">
		<div className="row">
			<div className="col">

				{/* <!-- Breadcrumbs --> */}

				<div className="breadcrumbs d-flex flex-row align-items-center">
					<ul>
						<li><a href="index.html">Home</a></li>
						<li><a href="categories.html"><i className="fa fa-angle-right" aria-hidden="true"></i>{categoryName}</a></li>
						<li className="active"><i className="fa fa-angle-right" aria-hidden="true"></i>{product.name}</li>
					</ul>
				</div>

			</div>
		</div>

		<div className="row">
			<div className="col-lg-7">
				<div className="single_product_pics">
					<div className="row">
						<div className="col-lg-3 thumbnails_col order-lg-1 order-2">
							<div className="single_product_thumbnails">
								<ul>
									<li onClick={() => this.handleClick(0)} className={activeImagePosition === 0 ? 'active' : ''}><img src={productImages[0]} alt=""></img></li>
									<li onClick={() => this.handleClick(1)} className={activeImagePosition === 1 ? 'active' : ''}><img src={productImages[1]} alt=""></img></li>
									<li onClick={() => this.handleClick(2)} className={activeImagePosition === 2 ? 'active' : ''}><img src={productImages[2]} alt=""></img></li>
								</ul>
							</div>
						</div>
						<div className="col-lg-9 image_col order-lg-2 order-1">
							<div className="single_product_image">
								<div className="single_product_image_background"><img style={{width:'100%'}} src={productImages[activeImagePosition]} alt=""></img></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="col-lg-5">
				<div className="product_details">
					<div className="product_details_title">
						<h2>{product.name}</h2>
						<p>{product.shortDescription}</p>
					</div>
					<div className="free_delivery d-flex flex-row align-items-center justify-content-center">
						<span className="ti-truck"></span><span>free delivery</span>
					</div>
					<div className="original_price">
						{product.salePrice !== product.originalPrice ? (<span>${product.originalPrice}</span>) : ''	}
					</div>
					<div className="product_price">
						<NumberFormat value={product.salePrice} displayType='text' thousandSeparator={true} /> VND
                    </div>
					<ul className="star_rating">
						<li><i className="fa fa-star" aria-hidden="true"></i></li>
						<li><i className="fa fa-star" aria-hidden="true"></i></li>
						<li><i className="fa fa-star" aria-hidden="true"></i></li>
						<li><i className="fa fa-star" aria-hidden="true"></i></li>
						<li><i className="fa fa-star-o" aria-hidden="true"></i></li>
					</ul>
					<div className="product_color">
						<span>Select Color:</span>
						<ul>
							<li style={{background: '#e54e5d'}}></li>
							<li style={{background: '#252525'}}></li>
							<li style={{background: '#60b3f3'}}></li>
						</ul>
					</div>
					<div className="quantity d-flex flex-column flex-sm-row align-items-sm-center">
						<span>Quantity:</span>
						<div className="quantity_selector">
							<span className="minus"><i className="fa fa-minus" aria-hidden="true"></i></span>
							<span id="quantity_value">1</span>
							<span className="plus"><i className="fa fa-plus" aria-hidden="true"></i></span>
						</div>
						<div onClick={() => this.handleAddToCartClick(product)} className="red_button" style={{marginLeft:'2rem'}}>add to cart</div>
						<div className="product_favorite d-flex flex-column align-items-center justify-content-center"></div>
					</div>
				</div>
			</div>
		</div>

	</div>
            </div>
        );
    }
}

Breadcrumbs.propTypes = {
	addToCart : PropTypes.func.isRequired,
};

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		 addToCart,
	}, dispatch);
  }

export default connect (mapStateToProps, mapDispatchToProps) (Breadcrumbs);