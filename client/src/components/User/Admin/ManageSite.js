import React, { Component } from 'react'
import UserLayout from '../../../HOC/User'
import UpdateSiteInfo from './UpdateSiteInfo'
 class ManageSite extends Component {
    render() {
        return (
            <UserLayout>
                <UpdateSiteInfo />
            </UserLayout>
        )
    }
}

export default ManageSite
