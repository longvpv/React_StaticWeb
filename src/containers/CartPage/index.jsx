import React, { PureComponent } from 'react';
import Cart from '../../components/Cart';

class CartPage extends PureComponent {
    render() {
        return (
            <div>
                <Cart />
            </div>
        );
    }
}

CartPage.propTypes = {

};

export default CartPage;