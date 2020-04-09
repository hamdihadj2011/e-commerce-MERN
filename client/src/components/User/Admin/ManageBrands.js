import React, { Component } from 'react'
import {connect} from 'react-redux'

import {getBrands,addBrands} from '../../../actions/product_actions'
import FormField from "../../../utils/Form/Form_Field";
import {
  update,
  generateData,
  isFormValid,
  resetFields} from "../../../utils/Form/Form_Actions";

class ManageBrands extends Component {
state={
    formError:false,
        formSuccess:false,
        formData:{
            name:{
                element: "input",
        value: "",
        config: {
            label:'Brand Name',
          name: "name_input",
          type: "text",
          placeholder: "enter the Brand"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
            }
        }
}

showCategoryItems=()=>{
return this.props.products.brands ? 
this.props.products.brands.map((item,i)=>(
    <div className='category_item' key={i}>
        {item.name}
    </div>
))
: null
}

updateForm = element => {
    const newFormData = update(element, this.state.formData, "brands");
    this.setState({
      formError: false, 
      formData: newFormData
    });
  };

  restFieldHandler=()=>{
const newFormData=resetFields(this.state.formData,'brands')
this.setState({
    formData:newFormData,
    formSuccess:true
})
  }
  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formData, "brands");
    let formisValid = isFormValid(this.state.formData, "brands");
    let existingBrands=this.props.products.brands
    if (formisValid) {
      this.props.dispatch(addBrands(dataToSubmit,existingBrands))
        .then(res=>{
            if(res.payload.success){
                this.restFieldHandler()
            }
            else{
this.setState({
    formError:true
})
            }
        })
    } else {
      this.setState({
        formError: true
      });
    }
  };
componentDidMount(){
    this.props.dispatch(getBrands())
}
    render() {
        return (
          <div className='admin_category_wrapper'>
            <h1>Brands</h1>
            <div className='admin_two_column'>
              <div className='left'>
                <div className='brands_container'>
                  {this.showCategoryItems()}
                </div>
              </div>
              <div className='right'>
                <form onSubmit={event => this.submitForm(event)}>
                  <FormField
                    id={"name"}
                    formData={this.state.formData.name}
                    change={element => this.updateForm(element)}
                  />
                  {
                    this.state.formError ? 
                    <div className='error_label'>
                        this Field is Required

                    </div>
                    :null
                }
                <button onClick={(event)=>this.submitForm(event)}>
                    Add Brand
                </button>
                </form>
              </div>
            </div>
          </div>
        );
    }
}

const mapStateToProps=(state)=>({
    products:state.products
})

export default  connect(mapStateToProps)(ManageBrands)