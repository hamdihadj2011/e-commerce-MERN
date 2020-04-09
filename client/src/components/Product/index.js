import React, { Component } from 'react'
import {connect } from 'react-redux'
import {getProductDetail,clearProductDetail} from '../../actions/product_actions'
import {addToCart} from '../../actions/user_cation'
import PageTop from '../../utils/PageTop'
import ProdInfo from './ProdInfo'
import ProdImg from './ProdImg'
class Product extends Component {
    componentDidMount(){
        const id =this.props.match.params.id
    
        this.props.dispatch(getProductDetail(id)).then(res=>{
            if(!this.props.products.productDetail){
                this.props.history.push('/')
            }
        })
    }
    componentWillUnmount(){
        this.props.dispatch(clearProductDetail())
    }

    addToCartHandler(id){
        this.props.dispatch(addToCart(id))
    }
    render() {
        
        return (
            <div>
                <PageTop 
                title='Product Details'
                />
                <div className="container">
                    {
                        this.props.products.productDetail ? <div className='product_detail_wrapper'>
                            <div className='left'>
                                <div style={{width:'500px'}}>
                                    <ProdImg
                                    detail={this.props.products.productDetail}
                                     />
                                </div>
                            </div>
                            <div className="right">
                                <ProdInfo 
                                addToCart={(id)=>this.addToCartHandler(id)}
                                detail={this.props.products.productDetail}
                                />
                            </div>
                        </div>: 'loading'
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps=state=>({
    products:state.products
})

export default  connect(mapStateToProps)(Product)