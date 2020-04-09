import React, { Component } from "react";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom'
import FormField from "../../../utils/Form/Form_Field";
import {
  update,
  generateData,
  isFormValid,
  populateFields,
  resetFields,
} from "../../../utils/Form/Form_Actions";
import {getSiteData,updateSiteData} from '../../../actions/site_actions'
class UpdateSiteInfo extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formData: {
      adress: {
        element: "input",
        value: "",
        config: {
          label: "Adress",
          name: "adress_input",
          type: "text",
          placeholder: "enter the Site adress",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true,
      },
      hours: {
        element: "input",
        value: "",
        config: {
          label: "Working_hours",
          name: "hours_input",
          type: "text",
          placeholder: "enter the Site Working hours",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true,
      },
      phone: {
        element: "input",
        value: "",
        config: {
          label: "Phone_number",
          name: "phone_number",
          type: "text",
          placeholder: "enter the Phone Number",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true,
      },
      email: {
        element: "input",
        value: "",
        config: {
          label: "Email",
          name: "email_input",
          type: "text",
          placeholder: "enter Your Email",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true,
      },
    },
  };


  componentDidMount(){
      this.props.dispatch(getSiteData())
      .then(()=>{
          const newFormData=populateFields(this.state.formData,this.props.site.siteData[0])
          this.setState({
              formData:newFormData
          })
      })
  }
  updateForm = (element) => {
    const newFormData = update(element, this.state.formData, "site_info");
    this.setState({
      formError: false,
      formData: newFormData,
    });
  };
  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formData, "site_info");
    let formisValid = isFormValid(this.state.formData, "site_info");
    if (formisValid) {
      this.props.dispatch(updateSiteData(dataToSubmit))
      .then(()=>{
        this.setState({
          formSuccess:true
        },()=>{
          setTimeout(()=>{
            this.setState({
              formSuccess:false
            })
          },2000)
        })
      })
    } else {
      this.setState({
        formError: true,
      });
    }
  };
  render() {
    return (
      <div>
        <form onSubmit={(event) => this.submitForm(event)}>
            <h1>Site Info</h1>
          <FormField
            id={"adress"}
            formData={this.state.formData.adress}
            change={(element) => this.updateForm(element)}
          />
          <FormField
            id={"hours"}
            formData={this.state.formData.hours}
            change={(element) => this.updateForm(element)}
          />
          <FormField
            id={"phone"}
            formData={this.state.formData.phone}
            change={(element) => this.updateForm(element)}
          />
          <FormField
            id={"email"}
            formData={this.state.formData.email}
            change={(element) => this.updateForm(element)}
          />
           <div>
               {
                   this.state.formSuccess ? 
                   <div className="form_success">
                            Success
                        </div>
                   :null
               }
                {
                        this.state.formError ? 
                        <div className="error_label">
                            Plesase Check your Data
                        </div>
                        :null
                    }

                    <button onClick={(event)=>this.submitForm(event)} type='submit'>Update</button>

                </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    site: state.site,
  };
};
export default connect(mapStateToProps)(UpdateSiteInfo);
