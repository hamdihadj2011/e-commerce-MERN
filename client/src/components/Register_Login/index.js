import React from "react";
import MyBoutton from "../../utils/Button";
import Login from './Login'
const RegisterLogin = () => {
  return (
    <div className='page_wrapper'>
      <div className='container'>
        <div className='register_login_container'>
          <div className='left'>
            <h1>New Customers</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis
              suscipit magnam, delectus, debitis iure laborum maiores atque quos
              excepturi, voluptas velit dolore! Quod odio placeat quas
              consequuntur.
            </p>
            <MyBoutton
              type='default'
              title='Create an acoount'
              linkTo='/register'
              addStyles={{
                margin: "10px 0 0 0 "
              }}
            />
          </div>
          <div className='right'>
            <h2>Registerd Customers</h2>
            <p>if u have an account,please Login</p>
                <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
