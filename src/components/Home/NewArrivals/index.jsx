import React, { PureComponent } from 'react';
import CategoryMenu from './CategoryMenu';
import ProductList from './ProductList';
import categoryApi from '../../../api/categoryApi.js';
import productApi from '../../../api/productApi.js';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';


class NewArrivals extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeCategoryId: '',
            categories: [],
            products: [],
            categoryProduct: [],
            loading: false,

        }
    };

    async componentDidMount() {
      try {
        const params = {_page:1, _limit:6};
            const categoriesApi = await categoryApi.getAll(params);
            const categories = categoriesApi.data
            this.setState({categories});
      } catch (error) {
        console.log('Failed to fetch:', error);
      }
    }
    
    
    handleCategoryClick = async (category) => {
      const loading = true;
      const products = [];
      this.setState({loading, products})
      try {
        const params = {categoryId : category.id, _page:1, _limit:8};
        const productsApi = await productApi.getAll(params);
        const products = productsApi.data;
        const loading = false;
        this.setState({products, loading});
        
    } catch (error) {
        console.log('Failed to fetch data: ', error.message);
    };
    this.setState({activeCategoryId : category.id});
    };
    render() {
      const {products, activeCategoryId, categories, loading} = this.state;
      // for (const product of products) {
      // if (product.categoryId === activeCategoryId) {categoryProduct.push(product)}
      // }
      // console.log(categoryProduct);
      
        return (
            <div>
                <CategoryMenu 
                categories={categories}
                activeCategoryId={activeCategoryId}
                onActiveItemChange={this.handleCategoryClick}
                />
                <div style={{width:100, margin:'auto'}}>

                    <Loader
                     type="BallTriangle"
                     color="#fe4c50"
                     height={100}
                     width={100}
                     
                     visible={loading}
 
                    />
                  </div>
                <ProductList 
                products={products}
                activeCategoryId={activeCategoryId}
                />
            </div>
        );
    }
}

NewArrivals.propTypes = {
activeCategoryId: PropTypes.string,
};

export default NewArrivals;