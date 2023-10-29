import React from 'react'
import Pagination from '../../Components/Pagination'
import AdminProductList from '../../feature/Admin/component/AdminProductList'
const AdminHome = () => {
    return (
        <div>

            <AdminProductList  children={<Pagination />} />
            

        </div>
    )
}

export default AdminHome