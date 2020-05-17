import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import './Breadcrumbs.css'

class Breadcrumbs extends PureComponent {
    
    
    render() {
        const { activeCategoryName } = this.props;
        
        
        return (
            <div>
                <div className="breadcrumbs d-flex flex-row align-items-center">
					<ul>
						<li><a href="index.html">Home</a></li>
        <li className="active"><a href="index.html"><i className="fa fa-angle-right" aria-hidden="true"></i><span>{activeCategoryName}</span></a></li>
					</ul>
				</div>
            </div>
        );
    }
}

Breadcrumbs.propTypes = {
    categories: PropTypes.array.isRequired,
	activeCategoryName: PropTypes.string.isRequired,
    onActiveItemChange: PropTypes.func,
};

Breadcrumbs.defaultProps = {
    categories: [],
    activeCategoryName: -1,
    onActiveItemChange: null,
}

export default Breadcrumbs;