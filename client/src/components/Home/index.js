import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getProductsByArrival,getProductsBySell} from '../../actions/product_actions'
import HomeSlider from './Home_Slider'
import HomePromotion from './Home_Promotion'
import CardBlock from '../../utils/CardBlock'
 class Home extends Component {

    componentDidMount(){
        this.props.dispatch(getProductsBySell())
        this.props.dispatch(getProductsByArrival())
    }

    render() {
        return (
            <div>
                <HomeSlider />
                <CardBlock list={this.props.products.bySell} title='Best Selling Guitars' />
                <HomePromotion />
                <CardBlock list={this.props.products.byArrivall} title='New Arrivals' />
            </div>
        )
    }
}

const mapStateToProps=state=>({
    products:state.products
})

export default connect(mapStateToProps)(Home)