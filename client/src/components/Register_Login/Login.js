import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import FormField from '../../utils/Form/Form_Field'
import  {update,generateData,isFormValid} from '../../utils/Form/Form_Actions'
import {loginUser} from '../../actions/user_cation'
class Login extends Component {
        state={
            formError:false,
            formSuccess:'',
            formData:{
                email:{
                    element:'input',
                    value:'',
                    config:{
                        name:'email_input',
                        type:'email',
                        placeholder:'enter your email'
                    },
                    validation:{
                        required:true,
                        email:true
                    },
                    valid:false,
                    touched:false,
                    validationMessage:''
                },
                password:{
                    element:'input',
                    value:'',
                    config:{
                        name:'password_input',
                        type:'password',
                        placeholder:'enter your password'
                    },
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false,
                    validationMessage:''
                }
            }
        }
    
    submitForm=(event)=>{
        event.preventDefault()
        let dataToSubmit=generateData(this.state.formData,'login')
        let formisValid=isFormValid(this.state.formData,'login')
        if(formisValid){
            this.props.dispatch(loginUser(dataToSubmit))
                    .then(response=>{
                        if(response.payload.loginSuccess){
                            console.log(response.payload.loginSuccess)
                            this.props.history.push('user/dashboard')
                        }
                        else{
                                this.setState( {
                                    formError:true
                                })
                        }
                    })
        }else{
            this.setState({
                formError:true,
            })
        }
        
    }
    updateForm=(element)=>{
        const newFormData=update(element,this.state.formData,'login')
        this.setState({
            formError:false,
            formData:newFormData
        })
    }
    render() {
        return (
            <div className='signin_wrapper'>
                <form onSubmit={(e)=>this.submitForm(e)}>
                    <FormField 
                    id={'email'}
                    formData={this.state.formData.email}
                    change={(element)=>this.updateForm(element)}
                    />

                    <FormField 
                    id={'password'}
                    formData={this.state.formData.password}
                    change={(element)=>this.updateForm(element)}
                    />
                    {
                        this.state.formError ? 
                        <div className="error_label">
                            Plesase Check your Data
                        </div>
                        :null
                    }

                    <button onClick={(event)=>this.submitForm(event)} type='submit'>Login</button>
                </form>
            </div>
        )
    }
}

export default  connect()(withRouter(Login))