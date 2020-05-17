import React, { PureComponent } from 'react';
import './DealOfTheWeak.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class DealOfTheWeak extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			minuteState : 45,
		}
	}
	componentDidMount() {
		const {seconds} = this.props;
		this.countdown(seconds);
	}
	countdown = (seconds) => {
		
		if (seconds === -1) return;
		
		this.setState({ secondState: seconds });
	
		setTimeout(() => {
		  this.countdown(seconds - 1);
		}, 1000);
	  };
    render() {
		const {secondState, minuteState} = this.state;
        return (
        
            <div className="deal_ofthe_week">
		<div className="container">
			<div className="row align-items-center">
				<div className="col-lg-6">
					<div className="deal_ofthe_week_img">
						<img src={'images/deal_ofthe_week.png'} alt=""></img>
					</div>
				</div>
				<div className="col-lg-6 text-right deal_ofthe_week_col">
					<div className="deal_ofthe_week_content d-flex flex-column align-items-center float-right">
						<div className="section_title">
							<h2>Deal Of The Week</h2>
						</div>
						<ul className="timer">
							<li className="d-inline-flex flex-column justify-content-center align-items-center">
								<div id="day" className="timer_num">03</div>
								<div className="timer_unit">Day</div>
							</li>
							<li className="d-inline-flex flex-column justify-content-center align-items-center">
								<div id="hour" className="timer_num">15</div>
								<div className="timer_unit">Hours</div>
							</li>
							<li className="d-inline-flex flex-column justify-content-center align-items-center">
								<div id="minute" className="timer_num">{minuteState}</div>
								<div className="timer_unit">Mins</div>
							</li>
							<li className="d-inline-flex flex-column justify-content-center align-items-center">
								<div id="second" className="timer_num">{secondState}</div>
								<div className="timer_unit">Sec</div>
							</li>
						</ul>
						<div className="red_button deal_ofthe_week_button"> <Link to={'/ShopPage'}>shop now</Link></div>
					</div>
				</div>
			</div>
		</div>
	</div>
        
                 
        );
    }
}

DealOfTheWeak.propTypes = {
	seconds: PropTypes.number.isRequired,
};
DealOfTheWeak.defaultProps = {
	seconds: 59,
}
export default DealOfTheWeak;