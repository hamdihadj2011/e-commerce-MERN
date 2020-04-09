import React from "react";
import UserLayout from "../../HOC/User";
import MyButton from '../../utils/Button'
export default function UserDashboard({user}) {
  return (
    <UserLayout>
      <div>
          <div className='user_nfo_panel'>
            <h1>User Information</h1>
            <div>
                <span>{user.userData.name}</span>
                <span>{user.userData.lastname}</span>
                <span>{user.userData.email}</span>
            </div>
            <MyButton 
            type='default'
            title='Edit Account Info'
            linkTo='/user/user_profile'
            />
          </div>
          <div className='user_nfo_panel'>
            <h1>History Purchases</h1>
                <div className='user_product_block_wrapper'>
                    History
                </div>
          </div>
      </div>
    </UserLayout>
  );
}
