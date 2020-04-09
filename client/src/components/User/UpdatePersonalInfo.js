import React, { Component } from "react";
import { connect } from "react-redux";
import FormField from "../../utils/Form/Form_Field";
import {
  update,
  generateData,
  isFormValid,
  populateFields
} from "../../utils/Form/Form_Actions";
import {updateUserData,clearUpdateUser} from '../../actions/user_cation'
class UpdatePersonalInfo extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "enter your name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          name: "lastname_input",
          type: "text",
          placeholder: "enter your lastname"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "enter your email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  componentDidMount(){
    const newFormData=populateFields(this.state.formData,this.props.user.userData)


    this.setState({
      formData:newFormData
    })
  }

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "update_user");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };
  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formData, "update_user");
    let formisValid = isFormValid(this.state.formData, "update_user");
    if (formisValid) {
      this.props.dispatch(updateUserData(dataToSubmit))
      .then(()=>{
        if(this.props.user.updateUser.success){
          this.setState({
            formSuccess:true
          },()=>{
            setTimeout(()=>{
                this.props.dispatch(clearUpdateUser())
                this.setState({formSuccess:false})
            },2000)
          })
        }
      })
    } else {
      this.setState({
        formError: true
      });
    }
  };
  render() {
    console.log(this.props.user)
    return (
      <div>
        <form onSubmit={event => this.submitForm(event)}>
          <h2>Personnal Account Information</h2>
          <div className='form_block_two'>
            <div className='block'>
              <FormField
                id={"name"}
                formData={this.state.formData.name}
                change={element => this.updateForm(element)}
                
              />
            </div>
            <div className='block'>
              <FormField
                id={"lastname"}
                formData={this.state.formData.lastname}
                change={element => this.updateForm(element)}
              />
            </div>
          </div>
          <div className='block'>
            <FormField
              id={"email"}
              formData={this.state.formData.email}
              change={element => this.updateForm(element)}
            />
          </div>
          <div>
              {
                  this.state.formSuccess ? 
                  <div className='form_success'>
                      Success
                  </div>
                  :null
              }
            {this.state.formError ? (
              <div className='error_label'>Plesase Check your Data</div>
            ) : null}

            <button onClick={event => this.submitForm(event)} type='submit'>
              Update Personal Info
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps=state=>{
  return {
    user:state.user
  }
}
export default connect(mapStateToProps)(UpdatePersonalInfo);
