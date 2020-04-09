import React, { Component } from 'react'
import {connect} from 'react-redux'
import USerLayout from '../../../HOC/User'
import FormField from "../../../utils/Form/Form_Field";
import FileUpload from '../../../utils/FileUpload.js'
import {
  update,
  generateData,
  isFormValid,
  populateOptionFields
,resetFields} from "../../../utils/Form/Form_Actions";
import {getBrands,getWoods,addProduct,clearProduct} from '../../../actions/product_actions'
class AddProduct extends Component {
    state={
        formError:false,
        formSuccess:false,
        formData:{
            name:{
                element: "input",
        value: "",
        config: {
            label:'Product Name',
          name: "name_input",
          type: "text",
          placeholder: "enter your name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel:true
            },
            description:{
                element: "textarea",
        value: "",
        config: {
            label:'Product Description',
          name: "description_input",
          type: "text",
          placeholder: "enter your description"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel:true
            },
            price:{
                element: "input",
        value: "",
        config: {
            label:'Product Price',
          name: "price_input",
          type: "number",
          placeholder: "enter your price"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel:true
            },
            brand:{
                element: "select",
        value: "",
        config: {
            label:'Product brand',
          name: "brand_input",
        options:[]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel:true
            },
            shipping:{
                element: "select",
        value: "",
        config: {
            label:'Shipping',
          name: "Shipping_input",
        options:[
            {key:true,value:'Yes'},
            {key:false,value:'No'}
        ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel:true
            },
            available:{
                element: "select",
        value: "",
        config: {
            label:'Available in Stock',
          name: "available_input",
        options:[
            {key:true,value:'Yes'},
            {key:false,value:'No'}
        ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel:true
            },
            wood:{
                element: "select",
        value: "",
        config: {
            label:'Wood Material',
          name: "wood_input",
        options:[]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel:true
            },
            frets:{
                element: "select",
        value: "",
        config: {
            label:'Frets',
          name: "frets_input",
        options:[
            {key:20,value:20},
            {key:21,value:21},
            {key:22,value:22},
            {key:24,value:24}
        ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel:true
            },
            publish:{
                element: "select",
        value: "",
        config: {
            label:'Publish',
          name: "publish_input",
        options:[
            {key:true,value:'Public'},
            {key:false,value:'Hidden'}
        ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel:true
            },
            images:{
              value:[],
              validation:{
                required:false
              },
              valid: true,
              touched: false,
              validationMessage: "",
              showLabel:false
            }
        }
    }
    resetFieldHandler=()=>{
      const newFormData=resetFields(this.state.formData,'products')
      this.setState({
        formSuccess:true,
        formData:newFormData
      })
      setTimeout(()=>{
        this.setState({
          formSuccess:false
        },()=>{
          this.props.dispatch(clearProduct())
        })
      },3000)
    }

    submitForm = event => {
      event.preventDefault();
      let dataToSubmit = generateData(this.state.formData, "products");
      let formisValid = isFormValid(this.state.formData, "products");
      console.log(formisValid)
      if (formisValid) {
        this.props.dispatch(addProduct(dataToSubmit))
          .then(()=>{
            if(this.props.products.addProduct.success){
                this.resetFieldHandler()
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
    updateForm = element => {
      const newFormData = update(element, this.state.formData, "products");
      this.setState({
        formError: false,
        formData: newFormData
      });
    };

    componentDidMount(){
      
        const formData=this.state.formData
        this.props.dispatch(getBrands()).then(res=>{
            const newFormData=populateOptionFields(formData,this.props.products.brands,'brand')
this.updateFields(newFormData)
        })

        this.props.dispatch(getWoods()).then(res=>{
            const newFormData=populateOptionFields(formData,this.props.products.woods,'wood')
this.updateFields(newFormData)
        })
    }

    updateFields=(newFormData)=>{
        this.setState({
            formData:newFormData
        })
    }
    imagesHandler=(images)=>{
      console.log(images)
      const newFormData= {
        ...this.state.formData
      }
      newFormData['images'].value=images[0].url
      newFormData['images'].valid=true
      this.setState({
        formData:newFormData
      })

    }
    render() {
        return (
          <USerLayout>
            <div>
              <h1>Add Product</h1>
              <form onSubmit={event => this.submitForm(event)}>
                <FileUpload
                imagesHandler={(images)=>this.imagesHandler(images)}
                reeset={this.state.formSuccess}
                 />
                <FormField
                  id={"name"}
                  formData={this.state.formData.name}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={"description"}
                  formData={this.state.formData.description}
                  change={element => this.updateForm(element)}
                />
                
                <FormField
                  id={"price"}
                  formData={this.state.formData.price}
                  change={element => this.updateForm(element)}
                />
                <div className='form_devider'></div>
                <FormField
                  id={"brand"}
                  formData={this.state.formData.brand}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={"shipping"}
                  formData={this.state.formData.shipping}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={"available"}
                  formData={this.state.formData.available}
                  change={element => this.updateForm(element)}
                />
                <div className='form_devider'></div>
                <FormField
                  id={"wood"}
                  formData={this.state.formData.wood}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={"frets"}
                  formData={this.state.formData.frets}
                  change={element => this.updateForm(element)}
                />
                <div className="form_devider"></div>
                <FormField
                  id={"publish"}
                  formData={this.state.formData.publish}
                  change={element => this.updateForm(element)}
                />
                {
                    this.state.formSuccess ? 
                    <div className='form_success'>
                            success...
                    </div> 
                    :null
                }
                {
                    this.state.formError ? 
                    <div className='error_label'>
                        Please Check Your Data

                    </div>
                    :null
                }
                <button onClick={(event)=>this.submitForm(event)}>
                    Add Product
                </button>
              </form>
            </div>
          </USerLayout>
        );
    }
}

const mapStateToProps=state=>({
    products:state.products
})

export default  connect(mapStateToProps)(AddProduct)