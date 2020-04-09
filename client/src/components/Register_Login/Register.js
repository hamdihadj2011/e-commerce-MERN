import React, { Component } from "react";
import { connect } from "react-redux";
// import Dialog from '@material-ui/core/Dialog' 
import FormField from "../../utils/Form/Form_Field";
import {
  update,
  generateData,
  isFormValid
} from "../../utils/Form/Form_Actions";
import { RegisterUser } from "../../actions/user_cation";
class Register extends Component {
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
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "enter your password"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      confirmPassword: {
        element: "input",
        value: "",
        config: {
          name: "confirm_password_input",
          type: "password",
          placeholder: "Confirm your password"
        },
        validation: {
          required: true,
          confirm: "password"
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };
  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formData, "register");
    let formisValid = isFormValid(this.state.formData, "register");
    if (formisValid) {
      this.props.dispatch(RegisterUser(dataToSubmit))
            .then(response=>{
                if(response.payload){
                    this.setState({
                        formError:false,
                        formSuccess:true
                    })
                    setTimeout(()=>{
                        this.props.history.push('/register_login')
                    },3000)

                }
                else{
                    this.setState({
                        formError:true
                    })
                }
                
            }).catch(e=>{
                this.setState({
                    formError:true
                })
            })
    } else {
      this.setState({
        formError: true
      });
    }
  };
  updateForm = element => {
    const newFormData = update(element, this.state.formData, "register");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };
  render() {
    return (
      <div className='page_wrapper'>
        <div className='container'>
          <div className='register_login_container'>
            <div className='left'>
              <form onSubmit={event => this.submitForm(event)}>
                <h2>Peronal information</h2>
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
                <div>
                  <FormField
                    id={"email"}
                    formData={this.state.formData.email}
                    change={element => this.updateForm(element)}
                  />
                </div>
                <h2>Verify Password</h2>
                <div className='form_block_two'>
                  <div className='block'>
                    <FormField
                      id={"password"}
                      formData={this.state.formData.password}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='block'>
                    <FormField
                      id={"confirmPassword"}
                      formData={this.state.formData.confirmPassword}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
                <div>
                {
                        this.state.formError ? 
                        <div className="error_label">
                            Plesase Check your Data
                        </div>
                        :null
                    }

                    <button onClick={(event)=>this.submitForm(event)} type='submit'>Register</button>

                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <Dialog open={this.state.formSuccess}>
            <div className="dialog_alert">
                <div>Congratulation!! </div>
                <div>You will be Redirected to the Login Page in a couple second... </div>
            </div>
        </Dialog> */}
      </div>
    );
  }
}

export default connect()(Register);
