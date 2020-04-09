import React, { Component } from 'react'
import UserLayout from '../../../HOC/User'
import ManageBrands from './ManageBrands'
import ManageWoods from './ManageWoods'
export default class ManageCatagories extends Component {
    render() {
        return (
            <UserLayout>
                <ManageBrands />
                <ManageWoods />
            </UserLayout>
        )
    }
}
