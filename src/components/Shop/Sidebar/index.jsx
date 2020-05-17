import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import './Sidebar.css';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import NumberFormat from 'react-number-format';



class Sidebar extends PureComponent {
	constructor (props) {
		super(props);
		this.state = {
			minValue: 0,
			maxValue: 10000000,
		}
	}
	handleCategoryClick = (category) => {
		const { onActiveItemChange } = this.props;
        if ( onActiveItemChange ) {
            onActiveItemChange(category);
		}

	};
	handleFilterChange = (min, max) => {

		console.log('This is min',max);
		const minValue = max[0];
		const maxValue = max[1];
		this.setState({minValue, maxValue})
		
	}

	handleFilterClick = (minValue, maxValue) => {
		const {onFilterChange} = this.props;
		if (onFilterChange) {onFilterChange(minValue, maxValue)};
	}
    render() {
		const { categories, activeCategoryName } = this.props;
		const {minValue, maxValue} = this.state;
		
		
        return (
            <div>
                <div className="sidebar">
					<div className="sidebar_section">
						<div className="sidebar_title">
							<h5>Product Category</h5>
						</div>
						<ul className="sidebar_categories">
						{categories.map(category => {
                        return (
                        <li 
                            key={category.id}
                            className={category.name === activeCategoryName ? 'active' : ''} 
                            onClick={() => this.handleCategoryClick(category)}>
                                {category.name}
                                </li>)
                    }
                    )}
						</ul>
					</div>

					<div className="sidebar_section">
						<div className="sidebar_title">
							<h5>Filter by Price</h5>
						</div>
						<div>
			
						<Typography id="range-slider" gutterBottom>
						Price range
					  	</Typography>
					  	<Slider
						min={0}
						max={10000000}
						defaultValue={[0, 10000000]}
						onChange={(min, max) => this.handleFilterChange(min, max)}
						aria-labelledby="range-slider"
					  	/>
					  </div>
					  <div>
						<p>Min Price : </p>
						<NumberFormat value={minValue} displayType='text' thousandSeparator={true} /> VND
						<p>Max Price : </p>
						<NumberFormat value={maxValue} displayType='text' thousandSeparator={true} /> VND
					  </div>
						<div onClick={() => this.handleFilterClick(minValue, maxValue)} className="filter_button"><span>filter</span></div>
					</div>

				</div>
            </div>
        );
    }
}

Sidebar.propTypes = {
	categories: PropTypes.array.isRequired,
	activeCategoryName: PropTypes.string,
	onActiveItemChange: PropTypes.func,
	onFilterChange: PropTypes.func,
	
};

Sidebar.defaultProps = {
    categories: [],
    activeCategoryName: '',
	onActiveItemChange: null,
	onFilterChange: null,
}

export default Sidebar;