import React, { Component } from 'react'
import {connect} from 'react-redux'

import {getWoods,addWoods} from '../../../actions/product_actions'
import FormField from "../../../utils/Form/Form_Field";
import {
  update,
  generateData,
  isFormValid,
  resetFields} from "../../../utils/Form/Form_Actions";
class ManageWoods extends Component {
    state={
        formError:false,
            formSuccess:false,
            formData:{
                name:{
                    element: "input",
            value: "",
            config: {
                label:'Wood Name',
              name: "name_input",
              type: "text",
              placeholder: "enter the Wood"
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
        return this.props.products.woods ? 
        this.props.products.woods.map((item,i)=>(
            <div className='category_item' key={i}>
                {item.name}
            </div>
        ))
        : null
        }
        updateForm = element => {
            const newFormData = update(element, this.state.formData, "woods");
            this.setState({
              formError: false, 
              formData: newFormData
            });
          };
        
          restFieldHandler=()=>{
        const newFormData=resetFields(this.state.formData,'woods')
        this.setState({
            formData:newFormData,
            formSuccess:true
        })
          }
    
          submitForm = event => {
            event.preventDefault();
            let dataToSubmit = generateData(this.state.formData, "woods");
            let formisValid = isFormValid(this.state.formData, "woods");
            let existingWoods=this.props.products.woods
            if (formisValid) {
              this.props.dispatch(addWoods(dataToSubmit,existingWoods))
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
            this.props.dispatch(getWoods())
        }
    render() {
        return (
            <div className='admin_category_wrapper'>
            <h1>Woods</h1>
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
                    Add Wood
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

export default  connect(mapStateToProps)(ManageWoods)