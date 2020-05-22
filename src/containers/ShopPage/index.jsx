import React, { PureComponent } from 'react';
import categoryApi from '../../api/categoryApi.js';
import productApi from '../../api/productApi.js';
import Breadcrumbs from '../../components/Shop/Breadcrumbs';
import MainContent from '../../components/Shop/MainContent';
import Sidebar from '../../components/Shop/Sidebar';
import './categories_responsive.css';



class index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeCategoryName: '',
            categories: [],
            products: [],
            categoryProduct: [],
            filters: { 
                _page: 1, 
                _limit: 6, 
                // _sort: 'originalPrice',
                // _order: 'asc',
                // salePrice_gte: minPrice,
                // salePrice_lte: maxPrice,
              },
            totalPage: 20,

            }
    }
    
    async componentDidMount() {
        try {
          const params = {_page:1, _limit:6};
              const categoriesApi = await categoryApi.getAll(params);
              const categories = categoriesApi.data
              this.setState({categories});

              const productsApi = await productApi.getAll(this.state.filters);
              const products = productsApi.data;
              const totalPage = Math.ceil(productsApi.pagination._totalRows / productsApi.pagination._limit);
              this.setState({totalPage, products});

        } catch (error) {
          console.log('Failed to fetch:', error);
        }
      };
      handleCategoryClick = async (category) => {
          const newFilters = {
              ...this.state.filters,
              categoryId: category.id,
          }
        try {
            const productsApi = await productApi.getAll(newFilters);
            const products = productsApi.data;
            const activeCategoryName = category.name;
            const totalPage = Math.ceil(productsApi.pagination._totalRows / productsApi.pagination._limit);
            this.setState({totalPage, products, activeCategoryName, filters: newFilters});
            
        } catch (error) {
            console.log('Failed to fetch data: ', error.message);
        }        
        };

        handleFilterChange = async (minValue, maxValue) => {
            const newFilters = {
                ...this.state.filters,
                salePrice_gte: minValue,
                salePrice_lte: maxValue,
            }
            try {
                const productsApi = await productApi.getAll(newFilters);
                const products = productsApi.data;
                const totalPage = Math.ceil(productsApi.pagination._totalRows / productsApi.pagination._limit);
                this.setState({totalPage, products, filters: newFilters});
                
            } catch (error) {
                console.log('Failed to fetch data: ', error.message);
            }  
        };

        handleFilterShowOffChange = async (number) => {
            const newFilters = {
                ...this.state.filters,
                _limit: number, 
            }
            try {
                const productsApi = await productApi.getAll(newFilters);
                const products = productsApi.data;
                const totalPage = Math.ceil(productsApi.pagination._totalRows / productsApi.pagination._limit);
                this.setState({totalPage, products, filters: newFilters});
                
            } catch (error) {
                console.log('Failed to fetch data: ', error.message);
            }  
        }

        handleFilterSoftingChange = async (filterName) => {
            const newFilters = {
                ...this.state.filters,
                _sort : filterName,
            }
            try {
                const productsApi = await productApi.getAll(newFilters);
                const products = productsApi.data;
                const totalPage = Math.ceil(productsApi.pagination._totalRows / productsApi.pagination._limit);
                this.setState({totalPage, products, filters: newFilters});
                
            } catch (error) {
                console.log('Failed to fetch data: ', error.message);
            }  
        }
        handleNextPageClick = async () => {
            const newFilters = {
                ...this.state.filters,
                _page: this.state.filters._page + 1,
            }
            try {
                const productsApi = await productApi.getAll(newFilters);
                const products = productsApi.data;
                const totalPage = Math.ceil(productsApi.pagination._totalRows / productsApi.pagination._limit);
                this.setState({totalPage, products, filters: newFilters});
                
            } catch (error) {
                console.log('Failed to fetch data: ', error.message);
            }  
        }
    render() {
        const {activeCategoryName, categories, products, filters, totalPage} = this.state;
        
        return (
            <div className="container product_section_container">
		<div className="row">
			<div className="col product_section clearfix">
                <Breadcrumbs 
                activeCategoryName={activeCategoryName}
                />
                
                <Sidebar 
                activeCategoryName={activeCategoryName}
                categories={categories}
                onActiveItemChange={this.handleCategoryClick}
                onFilterChange={this.handleFilterChange}
                />
                
                <MainContent 
                products={products}
                onFilterShowOffChange={this.handleFilterShowOffChange}
                onFilterSoftingChange={this.handleFilterSoftingChange}
                filters={filters}
                onNextPageClick={this.handleNextPageClick}
                totalPage={totalPage}
                />
            </div>
            </div>
            </div>
            
        );
    }
}

index.propTypes = {

};

export default index;