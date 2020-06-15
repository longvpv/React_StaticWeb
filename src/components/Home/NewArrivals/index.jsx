import React, { PureComponent } from "react";
import CategoryMenu from "./CategoryMenu";
import ProductList from "./ProductList";
import categoryApi from "../../../api/categoryApi.js";
import productApi from "../../../api/productApi.js";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";

class NewArrivals extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeCategoryId: "32a63859-293f-4e5b-817e-968e28bf309d",
      categories: [],
      products: [],
      categoryProduct: [],
      loading: false,
    };
  }

  async componentDidMount() {
    try {
      const categoriesApi = await categoryApi.getAll({ _page: 1, _limit: 6 });
      const categories = categoriesApi.data;
      this.setState({ categories });
      const productsApi = await productApi.getAll({
        categoryId: "32a63859-293f-4e5b-817e-968e28bf309d",
        _page: 1,
        _limit: 8,
      });
      const products = productsApi.data;
      this.setState({ products });
    } catch (error) {
      console.log("Failed to fetch:", error);
    }
  }

  handleCategoryClick = async (category) => {
    const loading = true;
    const products = [];
    this.setState({ loading, products });
    try {
      const params = { categoryId: category.id, _page: 1, _limit: 8 };
      const productsApi = await productApi.getAll(params);
      const products = productsApi.data;
      const loading = false;
      this.setState({ products, loading });
    } catch (error) {
      console.log("Failed to fetch data: ", error.message);
    }
    this.setState({ activeCategoryId: category.id });
  };
  render() {
    const { products, activeCategoryId, categories, loading } = this.state;

    return (
      <div>
        <CategoryMenu
          categories={categories}
          activeCategoryId={activeCategoryId}
          onActiveItemChange={this.handleCategoryClick}
        />
        <div style={{ width: 100, margin: "auto" }}>
          <Loader
            type="BallTriangle"
            color="#fe4c50"
            height={100}
            width={100}
            visible={loading}
          />
        </div>
        <ProductList products={products} activeCategoryId={activeCategoryId} />
      </div>
    );
  }
}

NewArrivals.propTypes = {
  activeCategoryId: PropTypes.string,
};

export default NewArrivals;
