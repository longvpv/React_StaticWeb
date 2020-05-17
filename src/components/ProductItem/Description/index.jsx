import React, { PureComponent } from 'react';

class Description extends PureComponent {
    
    render() {
        
        const productDescription = this.props.location.productDescription;
        const setInnerHtml = {__html: productDescription }
        return (    
            <div className="container">
                {/* <!-- Tab Description --> */}

            <div id="tab_1" className="tab_container active">
                <div className="row">
                    <div className="col desc_col">
                        <div className="tab_title">
                            <h4>Description</h4>
                        </div>
                        <div dangerouslySetInnerHTML={setInnerHtml} />
                        

                    </div>
                </div>
            </div>
            </div>
        );
    }
}

Description.propTypes = {

};

export default Description;