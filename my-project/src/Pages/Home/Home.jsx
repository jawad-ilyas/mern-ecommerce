import React from 'react'
import ProductList from '../../feature/ProductList/component/ProductList'
import Pagination from '../../Components/Pagination'
const Home = () => {
    return (
        <div>

            <ProductList  children={<Pagination />} />
            

        </div>
    )
}

export default Home