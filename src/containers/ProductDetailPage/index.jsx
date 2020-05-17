import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Breadcrumbs from '../../components/ProductItem/Breadcrumbs';
import Tabs from '../../components/ProductItem/Tabs';
import productApi from '../../api/productApi';
import categoryApi from '../../api/categoryApi';

class ProductDetailPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            productImages:[],
            categoryName: ''

        }
    }
    async componentDidMount() {
        const {match} = this.props;
        try {
            const postId = match.params.productId;
              const product = await productApi.getById(postId);
              
            const productImages = product.images;
            this.setState({product, productImages});

            const params = {_page:1, _limit:6};
            const categoriesApi = await categoryApi.getAll(params);
            const categories = categoriesApi.data;
            const category = categories.filter(category => category.id === product.categoryId);
            const categoryName = category[0].name;
            this.setState({categoryName});
            
        } catch (error) {
          console.log('Failed to fetch:', error);
        }
      };
      

    render() {
        const {product, productImages, categoryName} = this.state;
        return (
            <div>
                <Breadcrumbs 
                product = {product}
                productImages = {productImages}
                categoryName = {categoryName}
                />
                <Tabs 
                product = {product}
                match = {this.props.match}
                />
            </div>
        );
    }
}

ProductDetailPage.propTypes = {
    match: PropTypes.object.isRequired,
};

export default ProductDetailPage;