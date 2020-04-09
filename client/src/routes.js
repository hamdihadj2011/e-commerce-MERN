import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./HOC/Layout";
import Auth from './HOC/Auth'
import RegisterLogin from './components/Register_Login'
import Regitser from './components/Register_Login/Register'
import UserDashboard from './components/User'
import Shop from './components/Shop'
import AddProduct from './components/User/Admin/AddProducts'
import ManageCategories from './components/User/Admin/ManageCatagories'
import Product from './components/Product/index'
import UserCard from './components/User/Card'
import UpdateProfile from './components/User/UpdateProfile'
import ManageSite from './components/User/Admin/ManageSite'
import NotFound from './utils/NotFound'
const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path='/user/dashboard' component={Auth(UserDashboard,true)} />
        <Route exact path='/user/cart' component={Auth(UserCard,true)} />
        <Route exact path='/admin/add_product' component={Auth(AddProduct,true)} />
        <Route exact path='/admin/manage_categories' component={Auth(ManageCategories,true)} />
        <Route exact path='/user/user_profile' component={Auth(UpdateProfile,true)} />
        <Route exact path='/admin/site_info' component={Auth(ManageSite,true)} />

        <Route exact path='/product_detail/:id' component={Auth(Product,null)} />
        <Route exact path='/register_login' component={Auth(RegisterLogin,false)} />
        <Route exact path='/register' component={Auth(Regitser,false)} />
        <Route exact path='/' component={Auth(Home,null)} />
        <Route exact path='/shop' component={Auth(Shop,null)} />

        <Route component={NotFound}  />
      </Switch>
    </Layout>
  );
};

export default Routes;
