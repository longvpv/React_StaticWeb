import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import './NewArrivals.css';


class CategoryMenu extends PureComponent {
	
	handleTodoClick = (category) => {
		const { onActiveItemChange } = this.props;
        if ( onActiveItemChange ) {
            onActiveItemChange(category);
		}

	}
    render() {
		const { categories, activeCategoryId } = this.props;
        return (
            <div>
				<div className="new_arrivals">
		<div className="container">
			<div className="row">
				<div className="col text-center">
					<div className="section_title new_arrivals_title">
						<h2>New Arrivals</h2>
					</div>
				</div>
			</div>
			<div className="row align-items-center">
				<div className="col text-center">
					<div className="new_arrivals_sorting">
						<ul className="arrivals_grid_sorting clearfix button-group filters-button-group">
						{categories.map(category => {
						const isActive = 'grid_sorting_button button d-flex flex-column justify-content-center align-items-center active is-checked';
						const isAdjective = 'grid_sorting_button button d-flex flex-column justify-content-center align-items-center';
                        
                        return (
                        <li 
                            key={category.id}
                            className={category.id === activeCategoryId ? isActive : isAdjective } 
                            onClick={() => this.handleTodoClick(category)}>
                                {category.name}
                                </li>)
                    }
                    )}
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
            </div>
        );
    }
}

CategoryMenu.propTypes = {
	categories: PropTypes.array.isRequired,
	activeCategoryId: PropTypes.string.isRequired,
    onActiveItemChange: PropTypes.func,
};

CategoryMenu.defaultProps = {
    categories: [],
    activeCategoryId: -1,
    onActiveItemChange: null,
}

export default CategoryMenu;