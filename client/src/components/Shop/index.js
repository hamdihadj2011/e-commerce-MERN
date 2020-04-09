import React, { Component } from "react";
import {connect} from "react-redux";

import PageTop from "../../utils/PageTop";
import {getBrands,getWoods,getProductToShop} from '../../actions/product_actions'
import CollapseCheckBox from '../../utils/CollapseCheckBox.js'
import CollapseRadio from '../../utils/CollapseRadio'
import {frets,price} from '../../utils/Form/fixed_catagories'
import LoadMoreCards from './LoadMoreCards'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faBars from '@fortawesome/fontawesome-free-solid/faBars'
import faTh from '@fortawesome/fontawesome-free-solid/faTh'
class Shop extends Component {

    state={
        grid:'',
        limit:6,
        skip:0,
        filters:{
            brand:[],
            frets:[],
            wood:[],
            price:[]
        }
    }

    componentDidMount(){
        this.props.dispatch(getBrands())
        this.props.dispatch(getWoods())
        this.props.dispatch(getProductToShop(
            this.state.skip,
            this.state.limit,
            this.state.filters
        ))
    }

    handlePrices=(value)=>{
        const data=price
        let array=[]
        for(let key in data){
            if(data[key]._id===parseInt(value,10)){
                array=data[key].array
            }
        }
        return array
    }

    handleFilters=(filters,catagory)=>{
        const newFilters={...this.state.filters}
        newFilters[catagory]=filters

        if(catagory==='price'){
            let priceValues=this.handlePrices(filters)
            newFilters[catagory]=priceValues
        }
        this.showFilteredResuls(newFilters)
        this.setState({
            filters:newFilters
        })
    }

    showFilteredResuls=(filters)=>{
        this.props.dispatch(getProductToShop(
            0,
            this.state.limit,
            filters
        )).then(()=>this.setState({
            skip:0
        }))
    }

    LoadMoreCards=()=>{
        let skip=this.state.skip +this.state.limit
        this.props.dispatch(getProductToShop(
            skip,
            this.state.limit,
            this.state.filters,
            this.props.products.toShop
        )).then(()=>{
            this.setState({ 
                skip
            })
        })
    }

    handleGrid=()=>{
        this.setState({
            grid:!this.state.grid ?'grid_bars':''
        })
    }
  render() {
      const {products}=this.props
      
    return <div>
        <PageTop 
        title='browse Product'/>
        <div className='container'>
            <div className="shop_wrapper">
                <div className="left">
                     <CollapseCheckBox 
                     initState={true}
                     title='Brands'
                     list={products.brands}
                     handleFilters={(filters)=>this.handleFilters(filters,'brand')}
                     />   
                      <CollapseCheckBox 
                     initState={false}
                     title='Frets'
                     list={frets}
                     handleFilters={(filters)=>this.handleFilters(filters,'frets')}
                     />
                     <CollapseCheckBox 
                     initState={true}
                     title='Woods'
                     list={products.woods}
                     handleFilters={(filters)=>this.handleFilters(filters,'wood')}
                     />
                     <CollapseRadio 
                     initState={true}
                     title='Price'
                     list={price}
                     handleFilters={(filters)=>this.handleFilters(filters,'price')}
                     />       
                        
                </div>
                <div className="right">
                    <div className="shop_options">
                        <div className="shop_grids clear">
                            <div
                            className={`grid_btn ${this.state.grid ? '':'active'}`}
                            onClick={()=>this.handleGrid()}
                            >
                                <FontAwesomeIcon icon={faTh}/>
                            </div>
                            <div
                            className={`grid_btn ${!this.state.grid ? '':'active'}`}
                            onClick={()=>this.handleGrid()}
                            >
                                <FontAwesomeIcon icon={faBars}/>
                            </div>
                        </div>
                    </div>
                    <div>
                    <LoadMoreCards 
                        grid={this.state.grid}
                        limit={this.state.limit}
                        size={products.toShopSize}
                        products={products.toShop}
                        loadMore={()=>this.LoadMoreCards()}
                    />
                    </div>
                </div>
            </div>
        </div>
    </div>;
  }
}

const mapStetToProps=state=>({
    products:state.products
})

export default connect(mapStetToProps)(Shop);
