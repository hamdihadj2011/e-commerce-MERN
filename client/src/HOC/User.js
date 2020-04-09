import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
const Links=[
    {
        name:'My Accont',
        linkTo:'/user/dashboard'
    },
    {
        name:'User Information',
        linkTo:'/user/user_profile'
    },
    {
        name:'My Cart',
        linkTo:'/user/cart'
    }
]
const admin=[
    {
        name:'Site Info',
        linkTo:'/admin/site_info'
    },
    {
        name:'Add Products',
        linkTo:'/admin/add_product'
    },
    {
        name:'Manage Categories',
        linkTo:'/admin/manage_categories'
    }
]
 const UserLayout=(props)=> {
    
     const generateLinks=(links)=>{
            return links.map((item,i)=>(
                <Link to={item.linkTo} key={i}>{item.name}</Link>
            ))
     }
    return (
        <div className='container'>
            <div className='user_container'>
                <div className='user_left_nav'>
                    <h2>My Account</h2>
                    <div className='links'>
                        {generateLinks(Links)}
                    </div>
                    {
                        props.user.userData.isAdmin ? 
                        <div>
                            <h2>Admin</h2>
                            <div className="links">
                                {generateLinks(admin)}
                            </div>
                        </div>
                        :null
                    }
                </div>
                <div className='user_right'>
                        {props.children}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>({
    user:state.user
})
export default connect(mapStateToProps)(UserLayout)