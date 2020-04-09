import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getCartItems,removeCartItem} from '../../actions/user_cation'
import UserLayout from '../../HOC/User'
import UserProductBlock from '../../utils/User/product_block'
import Paypal from '../../utils/Paypal'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown'
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile'

//  AWFHUhTBEavH7_dhJ8TyfvH-hvasKfm8uSqXrs2mKNPBBgouPMFZV05PTQtIXDXmb8EfJfVOdJmlTD7F


 class Card extends Component {
     state={
         loading:true,
         total:0,
         showTotal:false,
         success:false
     }

     componentDidMount(){
         let cartItems=[]
         let user=this.props.user
         if(user.userData.cart){
             if(user.userData.cart.length>0){
                 user.userData.cart.forEach(item=>{
                     cartItems.push(item.id)
                 })
                 this.props.dispatch(getCartItems(cartItems,user.userData.cart))
                    .then(()=> {
                        if(this.props.user.cartDetail.length > 0){
                            this.calculateTotal(this.props.user.cartDetail);
                        }
                    })
             }
         }
        
     }
     calculateTotal=(cartDetail)=>{
        let total=0
        cartDetail.forEach(item=>{
            total += parseInt(item.price,10)* item.quantity
        })
        this.setState({
            total,
            showTotal:true
        })
     }
     removeFromCart=(id)=>{
this.props.dispatch(removeCartItem(id))
        .then(()=>{
            if(this.props.user.cartDetail.length<=0){
                this.setState({
                    showTotal:false
                })
            }
            else{
                this.calculateTotal(this.props.user.cartDetail)
            }

            
        })
     }
     showNoItemMessage=()=>(
         <div className='cart_no_items'>
             <FontAwesomeIcon icon={faFrown}
             />
             <div>You have No Items</div>
         </div>
     )
     transactionError=(data)=>{

     }
     transactionCanceled=(data)=>{

     }
     transactionSuccess=(data)=>{
         this.setState({
             showTotal:false,
             success:false
         })
     }
    render() {
        return (
            <UserLayout>
                <div>
                <h1>My Cart</h1>
                <div className='user_cart'>
                        <UserProductBlock 
                        products ={this.props.user}
                        type='cart'
                        removeItem={(id)=>this.removeFromCart(id)}
                        />
                        {this.state.showTotal ? 
                        <div className='user_cart_sum'>
                            <div>
                                Total Sum:  {this.state.total} USD
                            </div>
                        </div>:
                        this.state.success ?
                        <div className='cart_success'>
                                <FontAwesomeIcon icon={faSmile}
                                 />
                            <div>Thank You</div>
                            <div>
                                Your order is Now Complete
                            </div>
                        </div>
                        :
                        this.showNoItemMessage()}

                </div>
                {
                    this.state.showTotal ?
                        <div className='paypal_button_container'>
                            <Paypal 
                            toPay={this.state.total}
                            transactionError={(data)=>this.transactionError(data)}
                            transactionCanceled={(data)=>this.transactionCanceled(data)}
                            onSuccess={(data)=>this.transactionSuccess(data)}
                            />
                        </div>
                    :null
                }
            </div>
            </UserLayout>
        )
    }
}

const mapStateToProps=state=>{
    return {
        user:state.user
    }
}
export default connect(mapStateToProps)(Card)
