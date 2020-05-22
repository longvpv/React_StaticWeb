import React, { PureComponent } from "react";
import "./MainContent.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { addToCart } from "../../../actions/cart";
import NumberFormat from "react-number-format";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class MainContent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      itemShowing: 6,
      sortingName: "Default Sorting",
      modalShow: false,
    };
  }
  handleShowClick = (number) => {
    const { onFilterShowOffChange } = this.props;
    if (onFilterShowOffChange) {
      onFilterShowOffChange(number);
    }
    const itemShowing = number;
    this.setState({ itemShowing });
  };

  handleSoftClick = (filterName) => {
    const { onFilterSoftingChange } = this.props;
    if (onFilterSoftingChange) {
      onFilterSoftingChange(filterName);
    }

    if (filterName === "salePrice") {
      const sortingName = "Price";
      this.setState({ sortingName });
    } else if (filterName === "name") {
      const sortingName = "Product Name";
      this.setState({ sortingName });
    } else {
      const sortingName = "Default Sorting";
      this.setState({ sortingName });
    }
  };

  handleAddToCartClick = (product) => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.salePrice,
      pic: product.images[0],
      quantity: 1,
    };
    this.props.addToCart(item);
    const modalShow = true;
    this.setState({ modalShow });
  };

  handleNextPageClick = () => {
    if (this.props.filters._page === this.props.totalPage) return;
    const { onNextPageClick } = this.props;
    if (onNextPageClick) {
      onNextPageClick();
    }
  };
  handleClose = () => {
    const modalShow = false;
    this.setState({ modalShow });
  };
  render() {
    const { products, totalPage, filters } = this.props;
    const { itemShowing, sortingName, modalShow } = this.state;
    return (
      <div>
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
              <area shape="" coords="" href="" alt="" />
              <Link to="/Cart">
                <Button variant="primary" onClick={this.handleClose}>
                  Show Cart
                </Button>
              </Link>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="main_content">
          {/* <!-- Products --> */}

          <div className="products_iso">
            <div className="row">
              <div className="col">
                {/* <!-- Product Sorting --> */}

                <div className="product_sorting_container product_sorting_container_top">
                  <ul className="product_sorting">
                    <li>
                      <span className="type_sorting_text">{sortingName}</span>
                      <i className="fa fa-angle-down"></i>
                      <ul className="sorting_type">
                        <li
                          className="type_sorting_btn"
                          onClick={() => this.handleSoftClick("original-order")}
                        >
                          <span>Default Sorting</span>
                        </li>
                        <li
                          className="type_sorting_btn"
                          onClick={() => this.handleSoftClick("salePrice")}
                        >
                          <span>Price</span>
                        </li>
                        <li
                          className="type_sorting_btn"
                          onClick={() => this.handleSoftClick("name")}
                        >
                          <span>Product Name</span>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span>Show</span>
                      <span className="num_sorting_text">{itemShowing}</span>
                      <i className="fa fa-angle-down"></i>
                      <ul className="sorting_num">
                        <li
                          className="num_sorting_btn"
                          onClick={() => this.handleShowClick(6)}
                        >
                          <span>6</span>
                        </li>
                        <li
                          className="num_sorting_btn"
                          onClick={() => this.handleShowClick(12)}
                        >
                          <span>12</span>
                        </li>
                        <li
                          className="num_sorting_btn"
                          onClick={() => this.handleShowClick(24)}
                        >
                          <span>24</span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <div className="pages d-flex flex-row align-items-center">
                    <div className="page_current">
                      <span>{filters._page}</span>
                    </div>
                    <div className="page_total">
                      <span>of</span> {totalPage}
                    </div>
                    <div
                      id="next_page"
                      className="page_next"
                      onClick={this.handleNextPageClick}
                    >
                      <i
                        className="fa fa-long-arrow-right"
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                </div>

                <ul
                  className="product-grid"
                  data-isotope='{ "itemSelector": ".product-item", "layoutMode": "fitRows" }'
                >
                  {products.map((product) => {
                    return (
                      <li
                        key={product.id}
                        className="product-grid__item-width"
                        style={{ width: "33.3333%" }}
                      >
                        <div className="product-item">
                          <Link to={`/products/${product.id}`}>
                            <div className="product discount product_filter">
                              <div className="product_image">
                                <img src={product.images[0]} alt=""></img>
                              </div>
                              <div className="favorite favorite_left"></div>
                              <div className="product_info">
                                <h6 className="product_name">{product.name}</h6>
                                <div className="product_price">
                                  <NumberFormat
                                    value={product.salePrice}
                                    displayType="text"
                                    thousandSeparator={true}
                                  />{" "}
                                  VND
                                  {product.salePrice !==
                                  product.originalPrice ? (
                                    <span className="sale_price">
                                      {product.originalPrice}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>
                          </Link>
                          <div
                            onClick={() => this.handleAddToCartClick(product)}
                            className="red_button add_to_cart_button"
                          >
                            <span>add to cart</span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="product_sorting_container product_sorting_container_bottom clearfix">
                  <ul className="product_sorting">
                    <li>
                      <span>Show:</span>
                      <span className="num_sorting_text">03</span>
                      <i className="fa fa-angle-down"></i>
                      <ul className="sorting_num">
                        <li className="num_sorting_btn">
                          <span>01</span>
                        </li>
                        <li className="num_sorting_btn">
                          <span>02</span>
                        </li>
                        <li className="num_sorting_btn">
                          <span>03</span>
                        </li>
                        <li className="num_sorting_btn">
                          <span>04</span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <span className="showing_results">
                    Showing 1–3 of {itemShowing} results
                  </span>
                  <div className="pages d-flex flex-row align-items-center">
                    <div className="page_current">
                      <span>{filters._page}</span>
                    </div>
                    <div className="page_total">
                      <span>of</span> {totalPage}
                    </div>
                    <div
                      id="next_page_1"
                      className="page_next"
                      onClick={this.handleNextPageClick}
                    >
                      <i
                        className="fa fa-long-arrow-right"
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MainContent.propTypes = {
  addToCart: PropTypes.func.isRequired,
  onFilterShowOffChange: PropTypes.func,
  onFilterSoftingChange: PropTypes.func,
  onNextPageClick: PropTypes.func,
};

MainContent.defaultProps = {
  onFilterShowOffChange: null,
  onFilterSoftingChange: null,
  onNextPageClick: null,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addToCart,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
