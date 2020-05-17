import React, { PureComponent } from 'react';
import Banner from '../../components/Home/Banner';
import DealOfTheWeak from '../../components/Home/DealOfTheWeak';
import NewArrivals from '../../components/Home/NewArrivals';
import Slider from '../../components/Home/Slider';


class HomePage extends PureComponent {
    render() {
        return (
            <div>
            
            <Slider />
            <Banner />
            <NewArrivals />
            <DealOfTheWeak />

            </div>
        );
    }
}

HomePage.propTypes = {

};

export default HomePage;